import { Controller, Post, Res } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { LoginDto } from "src/common/dto/login.dto";

import { LoginService } from "./login.service";

@Controller("login")
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @ApiOperation({ summary: "Login for users" })
  async login(details: LoginDto, @Res() response) {
    const auth = await this.loginService.login(details);
    return response.status({status: "Authenticaticated", token: auth});
    // return response.status(result.status).json({ status: result.status, order: result.order });
    // throw new HttpException("Under construction", HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
