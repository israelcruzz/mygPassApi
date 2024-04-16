import { GymsRepositorys } from "src/repositories/gyms-repository";

interface SearchGymNameUseCaseRequest {
    query: string
    page: number
}

export class SearchGymNameUseCase {
    constructor(private gymRepository: GymsRepositorys){
        this.gymRepository = gymRepository
    }

    public async execute({ query, page }: SearchGymNameUseCaseRequest){
        const gymFilter = this.gymRepository.fetchMany(query, page)

        return gymFilter
    }
}