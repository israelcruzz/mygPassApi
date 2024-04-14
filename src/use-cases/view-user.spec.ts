import { expect, describe, it } from "vitest";
import inMemoryUserRepository from "src/repositories/in-memory/in-memory-user-repository";
import { ViewUserUseCase } from "./view-user";

describe("View User Use Case", () => {
  it("should be able to see user data", async () => {
    const viewUserUseCase = new ViewUserUseCase(inMemoryUserRepository);

    await inMemoryUserRepository.create({
      id: "usertest",
      name: "fdev",
      email: "fdev@gmail.com",
      password_hash: "1234",
    });

    const user = await viewUserUseCase.execute({
      userId: "usertest",
    });

    expect(user.id);
  });

  it("should be able to not show the data if not passing an existing id", async () => {
    const viewUserUseCase = new ViewUserUseCase(inMemoryUserRepository);

    await expect(() =>
      viewUserUseCase.execute({
        userId: "not-id-exists",
      })
    ).rejects.toThrow();
  });
});
