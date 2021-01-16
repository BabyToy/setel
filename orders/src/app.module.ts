import { Inject, Module } from "@nestjs/common";
import { ClientProxy, ClientsModule, Transport } from "@nestjs/microservices";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { OrdersController } from "./orders/orders.controller";
import { OrdersModule } from "./orders/orders.module";
import { LoginController } from './login/login.controller';
import { LoginModule } from './login/login.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

const hostName = process.env.HOST_HOSTNAME ?? "localhost";
const servicePort = process.env.SERVICE_PORT ? Number(process.env.SERVICE_PORT) : 3000;
console.log(`Service: ${hostName}:${servicePort}`);

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "PAYMENTS_SERVICE",
        options: {
          host: hostName,
          port: servicePort
        },
        transport: Transport.TCP
      }
    ]),
    OrdersModule,
    LoginModule,
    AuthModule
  ],
  controllers: [AppController, OrdersController, LoginController],
  providers: [AppService, AuthService]
})
export class AppModule {
  // constructor() {}
  constructor(@Inject("PAYMENTS_SERVICE") private client: ClientProxy) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }
}
