import { Controller, Get, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { resolveTxt } from "dns";

import { Message } from "./events/message.event";

@Controller()
export class AppController {
  constructor(@Inject("PAYMENTS_SERVICE") private readonly client: ClientProxy) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  @Get()
  getHello() {
    const text = "From orders service"
    this.client.emit<any>("print_message", new Message(text));
    return text;
  }
}
