import { Inject, Module } from "@nestjs/common";
import { ClientProxy, ClientsModule, Transport } from "@nestjs/microservices";

import { AuthModule } from "./auth/auth.module";
import { OrdersModule } from "./orders/orders.module";

const hostName = process.env.HOST_HOSTNAME ?? "localhost";
const servicePort = process.env.SERVICE_PORT ? Number(process.env.SERVICE_PORT) : 3000;
console.log(`Service: ${hostName}:${servicePort}`);

@Module({
  imports: [
    OrdersModule,
    AuthModule,
    ClientsModule.register([
      {
        name: "PAYMENTS_SERVICE",
        options: {
          host: hostName,
          port: servicePort
        },
        transport: Transport.TCP
      }
    ])
  ]
})
export class AppModule {
  constructor(@Inject("PAYMENTS_SERVICE") private client: ClientProxy) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }
}
