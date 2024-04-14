import { UserAlredyExistsError } from "../errors/user-already-exists-erros";
import { UserRepositorys } from "../repositories/users-repository";
import { hash } from "bcrypt";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private userRepository: UserRepositorys) {
    this.userRepository = userRepository;
  }

  public async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6);

    const findUserExistWithEmail = await this.userRepository.findByEmail(email)

    if (findUserExistWithEmail !== null) {
      throw new UserAlredyExistsError();
    }

    const userRegister = await this.userRepository.create({ name, email, password_hash })

    return userRegister;
  }
}