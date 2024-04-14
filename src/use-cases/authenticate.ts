import { compare } from "bcrypt";
import { InvalidCredentials } from "src/errors/invalid-credential";
import { UserRepositorys } from "src/repositories/users-repository";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

export class AuthenticateUseCase {
  constructor(private userRepository: UserRepositorys) {
    this.userRepository = userRepository;
  }

  public async execute({ email, password }: AuthenticateUseCaseRequest) {
    const user = await this.userRepository.findByEmail(email);

    if (user === null) {
      throw new InvalidCredentials();
    }

    const doesPasswordMatch = await compare(password, user.password_hash);

    if (doesPasswordMatch === false) {
      throw new InvalidCredentials();
    }

    return user;
  }
}
