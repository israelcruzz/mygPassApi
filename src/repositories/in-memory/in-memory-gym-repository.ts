import { Prisma } from "@prisma/client";
import { GymsRepositorys } from "../gyms-repository";

class inMemoryGymRepository implements GymsRepositorys {
  public gyms: Prisma.GymCreateInput[] = [];
  
  public async create({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: Prisma.GymCreateInput) {
    new Promise((resolve) => setTimeout(resolve, 10));

    const gym: Prisma.GymCreateInput = {
      title,
      description,
      phone,
      latitude,
      longitude,
    };

    this.gyms.push(gym);

    return gym;
  }

  public async findById(gymId: string) {
    new Promise((resolve) => setTimeout(resolve, 10));

    const gymFilter = this.gyms.find((gym) => gym.id === gymId);

    return gymFilter;
  }
}

export default new inMemoryGymRepository();
