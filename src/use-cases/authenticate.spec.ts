import { expect, describe, it } from "vitest";
import { hash } from "bcrypt";
import inMemoryUserRepository from "src/repositories/in-memory/in-memory-user-repository";
import { AuthenticateUseCase } from "./authenticate";

describe("Authenticate Use Case", () => {
  it("should be able to authenticate", async () => {
    const authenticateUseCase = new AuthenticateUseCase(inMemoryUserRepository);

    await inMemoryUserRepository.create({
      name: "mia",
      email: "mia@dev.com",
      password_hash: await hash("1234", 6),
    });

    const user = await authenticateUseCase.execute({
      email: "mia@dev.com",
      password: "1234",
    });

    expect(user);
  });

  it("should not be able to authenticate with wrong e-mail", async () => {
    const authenticateUseCase = new AuthenticateUseCase(inMemoryUserRepository);

    await expect(() =>
      authenticateUseCase.execute({
        email: "exampleerror@dev.com",
        password: "1234",
      })
    ).rejects.toThrow()
  });

  it("should not be able to authenticate with wrong password", async () => {
    const authenticateUseCase = new AuthenticateUseCase(inMemoryUserRepository);

    await expect(() =>
      authenticateUseCase.execute({
        email: "mia@dev.com",
        password: "12345678",
      })
    ).rejects.toThrow()
  });
});
