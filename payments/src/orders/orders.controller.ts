import { Controller } from "@nestjs/common";
import { EventPattern, MessagePattern } from "@nestjs/microservices";
import { createDto } from "src/common/dto/create.dto";
import { IServiceOrderResponse } from "src/common/interfaces/IServiceOrderResponse";

import { OrdersService } from "./orders.service";

@Controller("orders")
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @EventPattern("verify-order")
  async verifyOrderHandler(data: Record<string, unknown>) {
    console.log(data.orderId);
  }

  @MessagePattern({ cmd: "verify-order" })
  async verifyOrder(orderId: number): Promise<IServiceOrderResponse> {
    const result = await this.service.verify(orderId);
    return result;
  }

  @MessagePattern({ cmd: "create-order" })
  async createOrder(order: createDto): Promise<IServiceOrderResponse> {
    const result = await this.service.create(order);
    return result;
  }

  @MessagePattern({ cmd: "confirm-order" })
  async confirmOrder(orderId: number): Promise<IServiceOrderResponse> {
    const result = await this.service.confirm(orderId);
    return result;
  }

  @MessagePattern({ cmd: "cancel-order" })
  async cancelOrder(orderId: number): Promise<IServiceOrderResponse> {
    const result = await this.service.cancel(orderId);
    return result;
  }
}
