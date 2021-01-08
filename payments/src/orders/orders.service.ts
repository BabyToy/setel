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
    const newOrder = new Order();
    newOrder.customerId = order.customerId;
    newOrder.item = order.item;
    newOrder.qty = order.qty;
    newOrder.state = OrderState.CREATED;
    const result = await this.repository.save(newOrder);
    return {
      status: HttpStatus.OK,
      message: "Order created",
      order: { ...result }
    };
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
    result = {
      status: HttpStatus.OK,
      order
    };
    return result;
  }

  async confirm(orderId: number): Promise<IServiceOrderResponse> {
    let result: IServiceOrderResponse = await this.verify(orderId);
    if (result.status !== HttpStatus.OK) {
      return result;
    }
    let order = result.order;
    if (order.state !== OrderState.CREATED) {
      result = { status: HttpStatus.BAD_REQUEST, message: "Order already confirmed/cancelled/delivered" };
      return result;
    }
    order.state = OrderState.CONFIRMED;
    order = await this.repository.save(order);

    result.order = { ...order };
    result.message = "Order cancelled";
    return result;
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
