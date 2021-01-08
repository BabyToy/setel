import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
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

  async create(order: createDto) {
    const newOrder = new Order();
    newOrder.customerId = order.customerId;
    newOrder.item = order.item;
    newOrder.qty = order.qty;
    newOrder.state = OrderState.CREATED;
    return this.repository.insert(newOrder);
  }

  async verify(orderId: number) {
    let result: IServiceOrderResponse;
    const order = await this.repository.findOne(orderId);
    if (!order) {
      result = {
        status: HttpStatus.NOT_FOUND,
        message: "Order not found"
      }
      return result;
    }
    result = {
      status: HttpStatus.OK,
      order
    }
    return result;
  }

  async cancel(orderId: number) {
  //   const order = await this.verify(orderId);
  //   if (order.status === OrderState.DELIVERED) {
  //     throw new HttpException("Order already delivered", HttpStatus.BAD_REQUEST);
  //   }
  //   order.state = OrderState.CANCELLED;
  //   return this.repository.save(order);
  }
}
