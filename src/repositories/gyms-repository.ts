import { Prisma } from "@prisma/client";

export interface GymsRepositorys {
  create({ title, description, phone, latitude, longitude }: Prisma.GymCreateInput): Promise<Prisma.GymCreateInput>;
  findById(gymId: string): Promise<Prisma.GymCreateInput | null | undefined>
}