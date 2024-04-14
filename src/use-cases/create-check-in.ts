import { CheckInExistOnDay } from "src/errors/check-in-exist-on-day";
import { CheckInsRepositorys } from "src/repositories/check-ins-repository";

interface CreateCheckInUseCaseRequest {
  userId: string;
  gymId: string;
}

export class CreateCheckInUseCase {
  constructor(public checkInRepository: CheckInsRepositorys) {
    this.checkInRepository = checkInRepository;
  }

  public async execute({ userId, gymId }: CreateCheckInUseCaseRequest) {
    const checkInExist = await this.checkInRepository.findByUserIdOnDate(userId, new Date())

    if(checkInExist){
        throw new CheckInExistOnDay();
    }

    const checkIn = await this.checkInRepository.create({ userId, gymId });

    return checkIn;
  }
}