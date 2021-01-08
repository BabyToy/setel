import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { createDto } from "src/common/dto/create.dto";
import { IServiceOrderResponse } from "src/common/interfaces/IServiceOrderResponse";
import { OrderState } from "src/common/orderState";
import { Repository } from "typeorm";

import { Order } from "./orders.entity";

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private repository: Repository<Order>
  ) {}

  async create(order: createDto): Promise<IServiceOrderResponse> {
    let newOrder = new Order();
    newOrder.customerId = order.customerId;
    newOrder.item = order.item;
    newOrder.qty = order.qty;
    newOrder.state = OrderState.CREATED;
    newOrder = await this.repository.save(newOrder);

    // allow forced approval for e2d

    const approved = order.jgnpsiqbjxkdudavkrmafdrq !== undefined
      ? // under e2e
        // order will approve or decline automatically
        order.jgnpsiqbjxkdudavkrmafdrq
      : // not under e2e
        Math.floor(Math.random() * Math.floor(1)) === 1;
    if (approved) {
      // move this order to confirmed
      const confirmation = await this.confirm(newOrder.id);
      return confirmation;
    }
    // declined, cancel this order
    const cancellation = await this.cancel(newOrder.id);
    return cancellation;
  }

  async verify(orderId: number): Promise<IServiceOrderResponse> {
    let result: IServiceOrderResponse;
    const order = await this.repository.findOne(orderId);
    if (!order) {
      result = {
        status: HttpStatus.NOT_FOUND,
        message: "Order not found"
      };
      return result;
    }
    return {
      status: HttpStatus.OK,
      order
    };
  }

  async confirm(orderId: number): Promise<IServiceOrderResponse> {
    let result: IServiceOrderResponse = await this.verify(orderId);
    if (result.status !== HttpStatus.OK) {
      return result;
    }
    let order = result.order;
    if (order.state !== OrderState.CREATED) {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: "Order already confirmed/cancelled/delivered"
      };
      return result;
    }
    order.state = OrderState.CONFIRMED;
    order = await this.repository.save(order);

    // simulate approval, 10s
    setTimeout(confirmedId => {
      this.deliver(order.id);
    }, 10000);

    result.order = { ...order };
    result.message = "Order cancelled";
    return result;
  }

  async deliver(orderId: number): Promise<IServiceOrderResponse> {
    let result: IServiceOrderResponse = await this.verify(orderId);
    if (result.status !== HttpStatus.OK) {
      return result;
    }
    if (result.status !== HttpStatus.OK) {
      return { status: HttpStatus.INTERNAL_SERVER_ERROR, message: "Order is unconfirmed" };
    }
    // get a fresh object
    let order = await this.repository.findOne(orderId);
    order.state = OrderState.DELIVERED;
    order = await this.repository.save(order);
    return { status: HttpStatus.OK, message: "Order delivered", order: { ...order } };
  }

  async cancel(orderId: number): Promise<IServiceOrderResponse> {
    let result: IServiceOrderResponse = await this.verify(orderId);
    if (result.status !== HttpStatus.OK) {
      return result;
    }
    let order = result.order;
    if (order.state === OrderState.CANCELLED) {
      result = { status: HttpStatus.BAD_REQUEST, message: "Order already cancelled" };
      return result;
    }
    if (order.state === OrderState.DELIVERED) {
      result = { status: HttpStatus.BAD_REQUEST, message: "Order already delivered" };
      return result;
    }
    order.state = OrderState.CANCELLED;
    order = await this.repository.save(order);

    result.order = { ...order };
    result.message = "Order cancelled";
    return result;
  }
}
