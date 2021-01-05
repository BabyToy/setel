import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";

@Controller()
export class AppController {
  constructor() {}
  @EventPattern("print_message")
  async handleMessagePrinted(data: Record<string, unknown>) {
    console.log(`Received: ${data.text}`);
  }
}
