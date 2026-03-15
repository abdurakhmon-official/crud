import { NotFoundError } from "routing-controllers";
import prisma from "../utils/db";

export class UserService {
  static async get(id: string) {
    const user = await prisma.user.findFirst({
      where: { id },
    });

    if (!user) {
      throw new NotFoundError("user not found");
    }

    return user;
  }
}
