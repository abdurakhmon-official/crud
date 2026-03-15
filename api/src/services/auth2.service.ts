import { Inject, Injectable, InjectContext, PlatformContext } from "@tsed/common";
import { Request } from "express";
import { SigninInputSchema, SignupInputSchema, SinginInput, SingupInput } from "../inputs/auth.input";
import prisma from "../utils/db";
import { BadRequest, Unauthorized } from "@tsed/exceptions";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

@Injectable()
export class AuthService2 {
  @InjectContext()
  private context!: PlatformContext;

  get req() {
    return this.context.getRequest<Request>();
  }

  get user() {
    return this.req.user;
  }

  async signup(input: SingupInput) {
    const data = SignupInputSchema.parse(input);
    const { username } = data;

    let user = await prisma.user.findUnique({
      where: { username: username },
    });

    if (user) {
      throw new BadRequest("Username is already exist!");
    }

    user = await prisma.user.create({
      data: Object.assign<any, any>(data, {
        password: await hashPassword(data.password),
        active: true,
        createdAt: new Date(),
      }),
    });

    return { success: true };
  }

  async signin(input: SinginInput) {
    const data = SigninInputSchema.parse(input);
    const { username, password } = data;

    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        firstName: true,
        username: true,
        lastName: true,
        email: true,
        password: true,
        active: true,
        role: true,
      },
    });

    if (!user) {
      throw new BadRequest("Username or password is incorrect!");
    }

    const isValid = comparePasswords(user.password, password);
    if (!isValid) {
      throw new BadRequest("Username or password is incorect!");
    }

    if (!user.active) {
      throw new Unauthorized("Your account has been deactived!");
    }

    const token = createJWT({ id: user.id, username: user.username });
    return {
      success: true,
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        active: user.active,
        role: user.role,
      },
    };
  }
}
