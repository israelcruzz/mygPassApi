import { IGym } from "src/entitys/gym";
import { GymsRepositorys } from "../gyms-repository";
import { prisma } from "src/lib/prisma";
import { Prisma } from "@prisma/client";
import { getDistanceBetweenCoordinates } from "src/utils/get-distance-between-cordinate";

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

  public async fetchMany(query: string, page: number) {
    const fetchGyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      skip: page * 20,
      take: 20,
    });

    return fetchGyms;
  }

  public async fetchNearbyGyms(userLatitude: number, userLongitude: number) {
    const fetchNearbyGyms = await prisma.gym.findMany();

    const filteredGymsNearby = fetchNearbyGyms.filter((gym) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: userLatitude,
          longitude: userLongitude,
        },
        {
          latitude: Number(gym.latitude),
          longitude: Number(gym.longitude),
        }
      );

      return distance < 10;
    });

    return filteredGymsNearby;
  }
}

export default new PrismaGymRepository();
