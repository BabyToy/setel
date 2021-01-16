import { Injectable } from "@angular/core";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

import { AuthService } from "./auth.service";

// const Strategy = require("passport");

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ userName: "userName" });
  }

  async validate(userName: string, password: string) {
    // assume users are authenticated just for this test
    return true;
  }
}
