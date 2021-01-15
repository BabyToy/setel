import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty()
    userName: string;

    @ApiProperty()
    // this must be hashed
    password: string;
}