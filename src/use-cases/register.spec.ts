import { expect, describe, it } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcrypt";
import inMemoryUserRepository from "src/repositories/in-memory/in-memory-user-repository";

describe("Register Use Case", () => {
  it("should hash user password upon registration", async () => {
    const registerUseCase = new RegisterUseCase(inMemoryUserRepository);

    const user = await registerUseCase.execute({
      name: "test",
      email: "test@dev.com",
      password: "1234",
    });

    const passwordCorrectedHashed = await compare("1234", user.password_hash);

    expect(passwordCorrectedHashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    const registerUseCase = new RegisterUseCase(inMemoryUserRepository);

    await registerUseCase.execute({
      name: "test",
      email: "johdoes@dev.com",
      password: "1234",
    });

    await expect(() =>
      registerUseCase.execute({
        name: "test",
        email: "johdoes@dev.com",
        password: "1234",
      })
    ).rejects.toThrow();
  });

  it("should be able to register", async () => {
    const registerUseCase = new RegisterUseCase(inMemoryUserRepository);

    const user = await registerUseCase.execute({
      name: "test",
      email: "testdev@dev.com",
      password: "1234",
    });

    expect(user.id);
  });
});
