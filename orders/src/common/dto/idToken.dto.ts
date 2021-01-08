import { ApiProperty } from "@nestjs/swagger";

export class idTokenDto {
  @ApiProperty()
  orderId: number;

  @ApiProperty()
  token: string;
}