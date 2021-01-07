import { Controller } from "@nestjs/common";
import { EventPattern, MessagePattern } from "@nestjs/microservices";
import { cancelDto } from "src/common/dto/cancel.dto";
import { createDto } from "src/common/dto/create.dto";

@Controller("orders")
export class OrdersController {
  constructor() {}

  @EventPattern("verify-order")
  async verifyOrderHandler(data: Record<string, unknown>) {
    console.log(data.orderId);
  }

  @MessagePattern({ cmd: "verify-order" })
  async verifyOrder(orderId: number): Promise<number> {
    console.log(orderId);
    return 100;
  }

  @MessagePattern({ cmd: "create-order" })
  async createOrder(order: createDto): Promise<createDto> {
    return order;
  }

  @MessagePattern({ cmd: "cancel-order" })
  async cancelOrder(order: cancelDto): Promise<cancelDto> {
    return order;
  }
}
