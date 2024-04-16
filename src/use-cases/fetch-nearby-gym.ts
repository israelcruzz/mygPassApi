import { GymsRepositorys } from "src/repositories/gyms-repository";

interface FetchNearbyGymUseCaseRequest {
    userLatitude: number
    userLongitude: number
}

export class FetchNearbyGymUseCase {
    constructor(private gymRepository: GymsRepositorys){
        this.gymRepository = gymRepository
    }

    public async execute({ userLatitude, userLongitude }: FetchNearbyGymUseCaseRequest){

    }
}