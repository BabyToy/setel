import { ApiProperty } from "@nestjs/swagger";

export class VerifyDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  token: string;
}
