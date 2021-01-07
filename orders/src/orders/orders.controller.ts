import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiOperation } from "@nestjs/swagger";
import { Observable } from "rxjs";
import { createDto } from "src/dto/create.dto";
import { verifyDto } from "src/dto/verify.dto";
import { Message } from "src/events/message.event";

@Controller("/orders")
export class OrdersController {
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

  @Post("/create")
  @ApiOperation({ summary: "Create an order" })
  createOrder(@Body() order: createDto): Observable<createDto> {
    return this.client.send<createDto>({cmd: "create-order"}, order);
  }
}