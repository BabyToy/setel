import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "src/common/dto/login.dto";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async authenticate(details: LoginDto) {
    return { userName: details.userName };
  }

  async login(credentials: LoginDto) {
    return {
      token: this.jwtService.sign({ username: credentials.userName, sub: credentials.password })
    };
  }
}
