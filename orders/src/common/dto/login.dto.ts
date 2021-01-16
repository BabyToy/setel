import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({ required: true })
  userName: string;

  @ApiProperty({ required: true })
  // this must be hashed
  password: string;
}
