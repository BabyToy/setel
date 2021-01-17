import { ApiProperty } from "@nestjs/swagger";

import { IOrder } from "../interfaces/IOrder";

export class OrderDto {
  @ApiProperty()
  status: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  order?: IOrder;

  @ApiProperty()
  error?: number;
}
