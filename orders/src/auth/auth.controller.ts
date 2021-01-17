import { Body, Controller, HttpStatus, Post, Res, UseGuards } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { LoginDto } from "src/common/dto/login.dto";

import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalStrategy)
  @Post("login")
  @ApiOperation({ summary: "Login users" })
  async login(@Body() details: LoginDto, @Res() response) {
    const auth = await this.authService.login(details);
    return response.status(HttpStatus.OK).json(auth);
  }
}
