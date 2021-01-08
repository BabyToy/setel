import { ApiProperty } from "@nestjs/swagger";

export class IdTokenDto {
  @ApiProperty()
  orderId: number;

  @ApiProperty()
  token: string;
}