import { ApiProperty } from "@nestjs/swagger";

export class cancelDto {
  @ApiProperty()
  orderId: number;

  @ApiProperty()
  token: string;
}