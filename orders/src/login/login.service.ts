import { Injectable } from "@nestjs/common";
import { LoginDto } from "src/common/dto/login.dto";

@Injectable()
export class LoginService {
  async login(details: LoginDto) {
    // return JWT
    throw new Error("Method not implemented.");
  }
}
