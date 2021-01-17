import { ApiProperty } from "@nestjs/swagger";

export class VerifyDto {
  @ApiProperty({ required: true })
  id: number;
}
