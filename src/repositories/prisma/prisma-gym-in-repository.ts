import { IGym } from "src/entitys/gym";
import { GymsRepositorys } from "../gyms-repository";
import { prisma } from "src/lib/prisma";

class PrismaGymRepository implements GymsRepositorys {
  public async create({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: IGym) {
    const gym = await prisma.gym.create({
      data: {
        title,
        description,
        phone,
        latitude,
        longitude,
      },
    });

    return gym;
  }

  public async findById(gymId: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id: gymId,
      },
    });

    return gym;
  }
}

export default new PrismaGymRepository();
