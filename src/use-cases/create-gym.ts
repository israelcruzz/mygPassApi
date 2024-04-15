import { IGym } from "src/entitys/gym";
import { GymsRepositorys } from "src/repositories/gyms-repository";

export class CreateGymUseCase {
    constructor(private gymRepository: GymsRepositorys){
        this.gymRepository = gymRepository
    }

    public async execute({ title, description, phone, latitude, longitude }: IGym){
        const gym = await this.gymRepository.create({ title, description, phone, longitude, latitude })

        return gym
    }
}