import { Inject, Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ClientProxy, ClientsModule, Transport } from "@nestjs/microservices";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

import { OrdersController } from "./orders.controller";

@Module({
  imports: [ClientsModule.register([{ name: "PAYMENTS_SERVICE", transport: Transport.TCP }])],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
  controllers: [OrdersController]
})
export class OrdersModule {
  constructor(@Inject("PAYMENTS_SERVICE") private client: ClientProxy) {}
}
