import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ username: "userName" });
  }

  async validate(userName: string, password: string) {
    // assume users are authenticated just for this test
    return this.authService.authenticate({ userName, password });
  }
}
