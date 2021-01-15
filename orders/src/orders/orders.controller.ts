import { Body, Controller, Get, HttpException, HttpStatus, Inject, Post, Res } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiOperation } from "@nestjs/swagger";
import { CreateDto } from "src/common/dto/create.dto";
import { IdTokenDto } from "src/common/dto/idToken.dto";
import { OrderDto } from "src/common/dto/order.dto";
import { VerifyDto } from "src/common/dto/verify.dto";
import { IServiceOrderResponse } from "src/common/interfaces/IServiceOrderResponse";
import { Message } from "src/events/message.event";

@Controller("orders")
export class OrdersController {
  constructor(@Inject("PAYMENTS_SERVICE") private readonly client: ClientProxy) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  @Get()
  @ApiOperation({ summary: "Check order status" })
  getHello() {
    const text = "From orders service";
    this.client.emit<any>("print-message", new Message(text));
    return text;
  }

  @Post("verify")
  @ApiOperation({ summary: "Verify an order" })
  async verifyOrder(@Body() order: VerifyDto, @Res() response) {
    const result: IServiceOrderResponse = await this.client
      .send({ cmd: "verify-order" }, order.id)
      .toPromise();
    if (result.status !== HttpStatus.OK) {
      throw new HttpException(result.message, result.status);
    }
    return response.status(result.status).json({ status: result.status, order: result.order });
  }

  @Post("create")
  @ApiOperation({ summary: "Create an order" })
  async createOrder(@Body() order: CreateDto, @Res() response): Promise<OrderDto> {
    const result: IServiceOrderResponse = await this.client
      .send({ cmd: "create-order" }, order)
      .toPromise();

    return response
      .status(result.status)
      .json({ status: result.status, order: result.order, message: result.message });
  }

  @Post("confirm")
  @ApiOperation({ summary: "Confirm an order" })
  async confirmOrder(@Body() order: IdTokenDto, @Res() response): Promise<OrderDto> {
    const result: IServiceOrderResponse = await this.client
      .send({ cmd: "confirm-order" }, order.orderId)
      .toPromise();
    // return this.client.send<cancelDto>({ cmd: "cancel-order" }, order).toPromise();
    if (result.status !== HttpStatus.NOT_FOUND) {
      throw new HttpException(result.message, result.status);
    }

    return response
      .status(result.status)
      .json({ status: result.status, order: result.order, message: result.message });
  }

  @Post("deliver")
  @ApiOperation({ summary: "Deliver an order" })
  async deliverOrder(@Body() order: IdTokenDto, @Res() response): Promise<OrderDto> {
    const result: IServiceOrderResponse = await this.client
      .send({ cmd: "deliver-order" }, order.orderId)
      .toPromise();
    if (result.status !== HttpStatus.NOT_FOUND) {
      throw new HttpException(result.message, result.status);
    }

    return response
      .status(result.status)
      .json({ status: result.status, order: result.order, message: result.message });
  }

  @Post("cancel")
  @ApiOperation({ summary: "Cancel an order" })
  async cancelOrder(@Body() order: IdTokenDto, @Res() response): Promise<OrderDto> {
    const result: IServiceOrderResponse = await this.client
      .send({ cmd: "cancel-order" }, order.orderId)
      .toPromise();
    if (result.status !== HttpStatus.NOT_FOUND) {
      throw new HttpException(result.message, result.status);
    }
    return response
      .status(result.status)
      .json({ status: result.status, order: result.order, message: result.message });
  }
}
