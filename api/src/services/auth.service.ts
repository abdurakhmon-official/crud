import { SignIn, SignUp } from "../models/user";
import prisma from "../utils/db";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

type PayloadShape = {
  id: string;
  email: string;
};

const SECRET_CODE = "product-crud-secret";

export class AuthService {
  static async signUp(data: SignUp) {
    const hashedPassword = await this.hashPassword(data.password);

    const newUser = await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        username: data.email,
        password: hashedPassword,
        active: true,
        createdAt: new Date(),
        profileImage: "",
      },
    });

    return { success: true, id: newUser.id };
  }

  static async signIn(data: SignIn) {
    // data -> email, password
    const user = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      return { success: false, message: "User not found." };
    }

    // checking password
    const isPasswordOK = await this.comparePassword(data.password, user.password);

    if (!isPasswordOK) {
      return { success: false, message: "Invalid password." };
    }

    // generate JWT token
    const token = this.createJWT({ id: user.id, email: user.email });

    return {
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }

  private static comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  private static hashPassword(password: string) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hash(password, salt);
  }

  private static createJWT({ id, email }: PayloadShape) {
    const token = jwt.sign({ id, email }, SECRET_CODE);
    return token;
  }
}
