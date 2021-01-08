import { Controller } from "@nestjs/common";
import { EventPattern, MessagePattern } from "@nestjs/microservices";
import { cancelDto } from "src/common/dto/cancel.dto";
import { createDto } from "src/common/dto/create.dto";
import { IServiceOrderResponse } from "src/common/interfaces/IServiceOrderResponse";

import { Order } from "./orders.entity";
import { OrdersService } from "./orders.service";

@Controller("orders")
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @EventPattern("verify-order")
  async verifyOrderHandler(data: Record<string, unknown>) {
    console.log(data.orderId);
  }

  @MessagePattern({ cmd: "verify-order" })
  async verifyOrder(orderId: number): Promise<IServiceOrderResponse> {
    const result = await this.orderService.verify(orderId);
    return result;
  }

  @MessagePattern({ cmd: "create-order" })
  async createOrder(order: createDto): Promise<createDto> {
    const newOrder = await this.createOrder(order);
    return newOrder;
  }

  @MessagePattern({ cmd: "cancel-order" })
  async cancelOrder(order: cancelDto): Promise<cancelDto> {
    const cancelledOrder = await this.cancelOrder(order);
    return cancelledOrder;
  }
}
