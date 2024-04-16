import { describe, expect, it } from "vitest";
import { SearchGymNameUseCase } from "./search-gym-name";
import inMemoryGymRepository from "src/repositories/in-memory/in-memory-gym-repository";
import { Decimal } from "@prisma/client/runtime/library";

describe("Search Gym Use Case", () => {
  it("should be able to search gym per title", async () => {
    const searchGymUseCase = new SearchGymNameUseCase(inMemoryGymRepository);

    for (let i = 0; i <= 40; i++) {
      inMemoryGymRepository.gyms.push({
        title: `Ruby ${i}`,
        description: "for devlopers ruby",
        phone: ".rb",
        latitude: new Decimal(0),
        longitude: new Decimal(0),
      });
    }

    const gyms = await searchGymUseCase.execute({
      query: "Ruby",
      page: 1,
    });

    expect(gyms).toHaveLength(20)
  });
});
