import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { OrdersController } from "./orders/orders.controller";
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite" as any,
      host: "localhost",
      database: "./database/sqlite",
      synchronize: true
    }),
    OrdersModule
  ],
  controllers: [AppController, OrdersController],
  providers: [AppService],
})
export class AppModule {}
