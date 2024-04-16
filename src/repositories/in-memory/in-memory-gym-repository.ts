import { Prisma } from "@prisma/client";
import { GymsRepositorys } from "../gyms-repository";
import { getDistanceBetweenCoordinates } from "src/utils/get-distance-between-cordinate";

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

  public async fetchMany(query: string, page: number) {
    const fetchGyms = this.gyms
      .filter((gym) =>
        gym.title
          .toLocaleLowerCase()
          .trim()
          .includes(query.toLocaleLowerCase().trim())
      )
      .slice((page - 1) * 20, page * 20);

    return fetchGyms;
  }

  public async fetchNearbyGyms(userLatitude: number, userLongitude: number) {
    const nearbyGyms = this.gyms.filter((gym) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: userLatitude, longitude: userLongitude },
        { latitude: Number(gym.latitude), longitude: Number(gym.longitude) }
      );

      return distance < 10;
    });

    return nearbyGyms;
  }
}

export default new inMemoryGymRepository();
