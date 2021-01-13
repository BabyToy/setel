import { Inject, Module } from "@nestjs/common";
import { ClientProxy, ClientsModule, Transport } from "@nestjs/microservices";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { OrdersController } from "./orders/orders.controller";
import { OrdersModule } from "./orders/orders.module";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "PAYMENTS_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "0.0.0.0",
          port: 3000
        }
      }
    ]),
    OrdersModule
  ],
  controllers: [AppController, OrdersController],
  providers: [AppService]
})
export class AppModule {
  // constructor() {}
  constructor(@Inject("PAYMENTS_SERVICE") private client: ClientProxy) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }
}
