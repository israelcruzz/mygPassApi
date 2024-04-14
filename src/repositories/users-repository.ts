import { IUser } from "../entitys/user";
import { Prisma } from "@prisma/client";

export interface UserRepositorys {
    findByEmail: (email: string) => Promise<IUser | null>
    findById: (userId: string) => Promise<IUser | null>
    create: ({ name, email, password_hash }: Prisma.UserCreateInput) => Promise<IUser>
}