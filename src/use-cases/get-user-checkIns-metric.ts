import { CheckInsRepositorys } from "src/repositories/check-ins-repository";

interface GetUserCheckInsMetricUseCaseRequest {
    userId: string
}

export class GetUserCheckInsMetricUseCase {
    constructor(public checkInRepository: CheckInsRepositorys){
        this.checkInRepository = checkInRepository
    }

    public async execute({ userId }: GetUserCheckInsMetricUseCaseRequest){
        const countCheckIns = this.checkInRepository.findUserCountCheckIns(userId)

        return countCheckIns
    }
}