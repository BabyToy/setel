import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { createDto } from "src/common/dto/create.dto";
import { OrderState } from "src/common/orderState";
import { Repository } from "typeorm";

import { Order } from "./orders.entity";

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private repository: Repository<Order>
  ) {}

  async create(order: createDto) {
    const newOrder = new Order();
    newOrder.customerId = order.customerId;
    newOrder.item = order.item;
    newOrder.qty = order.qty;
    newOrder.state = OrderState.CREATED;
    return await this.repository.insert(newOrder);
  }
}
