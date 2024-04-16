import { NotResource } from "src/errors/not-resouce";
import { CheckInsRepositorys } from "src/repositories/check-ins-repository";

interface ValidateCheckInUseCaseRequest {
    checkInId: string
}

export class ValidateCheckInUseCase {
    constructor(private checkInRepository: CheckInsRepositorys){
        this.checkInRepository = checkInRepository
    }

    public async execute({ checkInId }: ValidateCheckInUseCaseRequest) {
       const findCheckIn = await this.checkInRepository.findCheckInById(checkInId)

       if(!findCheckIn) {
        throw new NotResource()
       }

       findCheckIn.validated_at = new Date()

       await this.checkInRepository.save(findCheckIn)

       return findCheckIn
    }
}