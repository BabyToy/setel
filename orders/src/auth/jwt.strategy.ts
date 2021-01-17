import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { jwtConstants } from "./constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken();
    super({
      jwtFromRequest: token,
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret
    });
  }

  async validate(payload: any) {
    const result = { userId: payload.sub, userName: payload.username };
    return result;
  }
}
