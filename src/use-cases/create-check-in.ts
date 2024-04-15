import { Decimal } from "@prisma/client/runtime/library";
import { CheckInExistOnDay } from "src/errors/check-in-exist-on-day";
import { NotResource } from "src/errors/not-resouce";
import { CheckInsRepositorys } from "src/repositories/check-ins-repository";
import { GymsRepositorys } from "src/repositories/gyms-repository";
import { getDistanceBetweenCoordinates } from "src/utils/get-distance-between-cordinate";

interface CreateCheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: Decimal;
  userLongitude: Decimal;
}

export class CreateCheckInUseCase {
  constructor(
    private checkInRepository: CheckInsRepositorys,
    private gymRepository: GymsRepositorys
  ) {
    this.checkInRepository = checkInRepository;
  }

  public async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CreateCheckInUseCaseRequest) {
    const doesExistGym = await this.gymRepository.findById(gymId);

    if (!doesExistGym) {
      throw new NotResource();
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: Number(userLatitude), longitude: Number(userLongitude) },
      {
        latitude: Number(doesExistGym.latitude),
        longitude: Number(doesExistGym.longitude),
      }
    );

    const MAX_DISTANCE_IN_KM = 0.1;

    if (distance > MAX_DISTANCE_IN_KM) {
      throw new NotResource();
    }

    const checkInExist = await this.checkInRepository.findByUserIdOnDate(
      userId,
      new Date()
    );

    if (checkInExist) {
      throw new CheckInExistOnDay();
    }

    const checkIn = await this.checkInRepository.create({ userId, gymId });

    return checkIn;
  }
}
