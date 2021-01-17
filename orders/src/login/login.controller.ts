import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { LoginDto } from "src/common/dto/login.dto";

import { LoginService } from "./login.service";

@Controller("login")
export class LoginController {
  constructor(private readonly service: LoginService) {}

  // @UseGuards(LocalStrategy)
  @Post()
  @ApiOperation({ summary: "Login users" })
  async login(@Body() details: LoginDto, @Res() response) {
    const auth = await this.service.login(details);
    return response.status(HttpStatus.OK).json(auth);
  }
}
