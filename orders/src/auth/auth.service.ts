import { Injectable } from "@nestjs/common";
import { LoginDto } from "src/common/dto/login.dto";

@Injectable()
export class AuthService {
  async authenticate(details: LoginDto) {
    return "sample token";
//    throw new Error("Method not implemented.");
  }
}
