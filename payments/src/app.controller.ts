import { Controller } from "@nestjs/common";
import { EventPattern, MessagePattern } from "@nestjs/microservices";
import { Observable } from "rxjs";

@Controller()
export class AppController {
  constructor() {}

  @EventPattern("print-message")
  async handleMessagePrinted(data: Record<string, unknown>) {
    console.log(`Received: ${data.text}`);
  }

  @EventPattern("verify-order")
  async verifyOrderHandler(data: Record<string, unknown>) {
    console.log(data.orderId);
  }

  @MessagePattern({ cmd: "verify-order" })
  async verifyOrder(orderId: number): Promise<number> {
    console.log(orderId);
    return 100;
  }
}
