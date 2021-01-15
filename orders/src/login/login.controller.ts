import { Controller, HttpException, HttpStatus, Post, Res } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";

@Controller("login")
export class LoginController {
  constructor() {}

  @Post()
  @ApiOperation({ summary: "Login for users" })
  async login() {details: LoginDto, @Res response} {
    // return response.status(result.status).json({ status: result.status, order: result.order });
    throw new HttpException("Under construction", HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
