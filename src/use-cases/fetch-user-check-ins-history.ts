import { CheckInsRepositorys } from "src/repositories/check-ins-repository";

interface FetchUserCheckInsHistoryUseCaseRequest {
  userId: string;
  page: number;
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(public checkInRepository: CheckInsRepositorys) {
    this.checkInRepository = checkInRepository;
  }

  public async execute({
    userId,
    page,
  }: FetchUserCheckInsHistoryUseCaseRequest) {
    const historyCheckIns = this.checkInRepository.findManyUserId(userId, page);

    return historyCheckIns;
  }
}
