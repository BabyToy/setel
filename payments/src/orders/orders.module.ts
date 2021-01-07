import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { OrdersController } from "./orders.controller";
import { Order } from "./orders.entity";
import { OrdersService } from "./orders.service";

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  exports: [OrdersService],
  providers: [OrdersService],
  controllers: [OrdersController]
})
export class OrdersModule {}
