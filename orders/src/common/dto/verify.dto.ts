import { ApiProperty } from "@nestjs/swagger";

export class verifyDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  token: string;
}
