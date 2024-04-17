import dayjs from "dayjs";
import { NotResource } from "src/errors/not-resouce";
import { CheckInsRepositorys } from "src/repositories/check-ins-repository";

interface ValidateCheckInUseCaseRequest {
  checkInId: string;
}

export class ValidateCheckInUseCase {
  constructor(private checkInRepository: CheckInsRepositorys) {
    this.checkInRepository = checkInRepository;
  }

  public async execute({ checkInId }: ValidateCheckInUseCaseRequest) {
    const findCheckIn = await this.checkInRepository.findCheckInById(checkInId);

    if (!findCheckIn) {
      throw new NotResource();
    }

    const distanceInMinutesCheckInCreation = dayjs(new Date()).diff(
      findCheckIn.created_at,
      "minutes"
    );

    if(distanceInMinutesCheckInCreation > 20) {
        throw new Error('The time validate check-in has exceeded')
    }

    findCheckIn.validated_at = new Date();

    await this.checkInRepository.save(findCheckIn);

    return findCheckIn;
  }
}
