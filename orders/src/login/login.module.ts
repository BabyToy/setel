import { Module } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";

import { LoginController } from "./login.controller";
import { LoginService } from "./login.service";

@Module({
  providers: [LoginService, AuthService],
  controllers: [LoginController],

})
export class LoginModule {}
