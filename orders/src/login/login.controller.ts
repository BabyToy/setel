import { Body, Controller, HttpStatus, Post, Res, UseGuards } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { AuthService } from "src/auth/auth.service";
import { LocalStrategy } from "src/auth/local.strategy";
import { LoginDto } from "src/common/dto/login.dto";

@Controller("login")
export class LoginController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @UseGuards(LocalStrategy)
  @Post()
  @ApiOperation({ summary: "Login for users" })
  async login(@Body() details: LoginDto, @Res() response) {
    const auth = await this.authService.authenticate(details);
    return response.status(HttpStatus.OK).json({ status: "Authenticaticated", token: auth });
  }
}
