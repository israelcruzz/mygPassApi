import { describe, expect, it } from "vitest";
import { CreateGymUseCase } from "./create-gym";
import inMemoryGymRepository from "src/repositories/in-memory/in-memory-gym-repository";
import { Decimal } from "@prisma/client/runtime/library";

describe("Create Gym Use Case", () => {
  it("should be able to creat gym", async () => {
    const createGymUseCase = new CreateGymUseCase(inMemoryGymRepository);

    const gym = await createGymUseCase.execute({
      title: "Gym Academy Devlopers",
      latitude: new Decimal(0),
      longitude: new Decimal(0),
      description: "gym for all devlopers",
      phone: ".ts",
    });

    expect(gym.title).toEqual(expect.any(String));
  });
});
