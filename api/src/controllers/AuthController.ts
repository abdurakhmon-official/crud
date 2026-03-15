import { Body, JsonController, Post } from "routing-controllers";
import { AuthService } from "../services/auth.service";
import { SignIn, SignUp } from "../models/user";

@JsonController("/auth")
export class AuthController {
  @Post("/signup")
  signUp(@Body() data: SignUp) {
    return AuthService.signUp(data);
  }

  @Post("/signin")
  signIn(@Body() data: SignIn) {
    return AuthService.signIn(data);
  }
}
