import { IUser } from "src/entitys/user";
import { UserRepositorys } from "../users-repository";
import { Prisma } from "@prisma/client";

export class InMemoryUserRepository implements UserRepositorys {
  public users: IUser[] = [];

  public async create({ id, name, email, password_hash }: Prisma.UserCreateInput) {
    await new Promise((resolve) => setTimeout(resolve, 10));

    const user = {
      id,
      name,
      email,
      password_hash,
    };

    this.users.push(user);

    return user;
  }

  public async findByEmail(email: string) {
    new Promise((resolve) => setTimeout(resolve, 10));

    const user = this.users.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  public async findById(userId: string) {
    new Promise((resolve) => setTimeout(resolve, 10));

    const user = this.users.find((user) => user.id === userId);

    if (!user) {
      return null;
    }

    return user;
  }
}

export default new InMemoryUserRepository();
