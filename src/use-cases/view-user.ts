import { UserNotExists } from "src/errors/user-not-exists";
import { UserRepositorys } from "src/repositories/users-repository";

interface ViewUserUseCaseRequest {
  userId: string;
}

export class ViewUserUseCase {
  constructor(private userRepository: UserRepositorys) {
    this.userRepository = userRepository;
  }

  public async execute({ userId }: ViewUserUseCaseRequest) {
    const user = await this.userRepository.findById(userId);

    if (user === null) {
      throw new UserNotExists();
    }

    return user;
  }
}
