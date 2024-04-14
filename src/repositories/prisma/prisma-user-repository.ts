import { prisma } from "../../lib/prisma";
import { Prisma } from "@prisma/client";
import { UserRepositorys } from "../users-repository";

class PrismaUserRepository implements UserRepositorys {
  public async create({ name, email, password_hash }: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password_hash,
      },
    });

    return user;
  }

  public async findByEmail(email: string) {
    const userExistsByEmail = prisma.user.findUnique({
      where: {
        email,
      },
    });

    return userExistsByEmail;
  }

  public async findById(userId: string) {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    return user;
  }
}

export default new PrismaUserRepository();
