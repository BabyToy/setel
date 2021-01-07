import { ApiProperty } from "@nestjs/swagger";

export class createDto {
  @ApiProperty()
  customerId: number;

  @ApiProperty()
  item: number;

  @ApiProperty()
  qty: number;

  @ApiProperty()
  token: string;
}
