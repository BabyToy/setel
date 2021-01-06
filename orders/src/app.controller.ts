import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiOperation } from "@nestjs/swagger";
import { Observable } from "rxjs";

import { Message } from "./events/message.event";

class verifyDto {
  id: number;
}

@Controller()
export class AppController {
  constructor(@Inject("PAYMENTS_SERVICE") private readonly client: ClientProxy) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  @Get()
  getHello() {
    const text = "From orders service";
    this.client.emit<any>("print-message", new Message(text));
    return text;
  }

  @Post("/verify")
  @ApiOperation({ summary: "Verify an order" })
  verifyOrder(@Body() order: verifyDto): Observable<number> {
    return this.client.send<number>({ cmd: "verify-order" }, order.id);
    // this.client.emit<any>("verify-order", new VerifyOrder(order.id));
  }
}
