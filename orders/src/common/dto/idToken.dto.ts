import { ApiProperty } from "@nestjs/swagger";

export class IdTokenDto {
  @ApiProperty({ required: true })
  orderId: number;
}
