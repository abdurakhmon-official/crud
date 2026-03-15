import { BodyParams, Inject } from "@tsed/common";
import { Post } from "routing-controllers";
import { SinginInput, SingupInput } from "../inputs/auth.input";
import { AuthService2 } from "../services/auth2.service";

@Inject()
export class AuthController {
  @Inject() authService!: AuthService2;

  @Post("/signup")
  async singup(@BodyParams() data: SingupInput) {
    return await this.authService.signup(data);
  }

  @Post("/signin")
  async signin(@BodyParams() data: SinginInput) {
    return await this.authService.signin(data);
  }
}
