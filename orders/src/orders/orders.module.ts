import { Inject, Module } from "@nestjs/common";
import { ClientProxy, ClientsModule, Transport } from "@nestjs/microservices";

import { OrdersController } from "./orders.controller";

@Module({
  imports: [
    ClientsModule.register([{ name: "PAYMENTS_SERVICE", transport: Transport.TCP }])
  ],
  controllers: [OrdersController]
})
export class OrdersModule {
  constructor(@Inject("PAYMENTS_SERVICE") private client: ClientProxy) {}
}
