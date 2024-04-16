import { describe, expect, it } from "vitest";
import { FetchNearbyGymUseCase } from "./fetch-nearby-gym";
import inMemoryGymRepository from "src/repositories/in-memory/in-memory-gym-repository";
import { Decimal } from "@prisma/client/runtime/library";

describe("Fetch Nearby Gym Use Case", () => {
  it("should be able to search nearby gyms", async () => {
    const fetchNearbyGymsUseCase = new FetchNearbyGymUseCase(
      inMemoryGymRepository
    );

    inMemoryGymRepository.gyms.push({
      title: "Pyhton",
      latitude: new Decimal(-22.9068),
      longitude: new Decimal(-43.1729),
      description: "",
      phone: "",
    });

    const fetchNearbyGyms = await fetchNearbyGymsUseCase.execute({
      userLatitude: -22.9176,
      userLongitude: -43.2220,
    });

    expect(fetchNearbyGyms).toHaveLength(1)
  });

  it("should not be able to search for gyms more than 10km away", async () => {
    const fetchNearbyGymsUseCase = new FetchNearbyGymUseCase(
      inMemoryGymRepository
    );

    inMemoryGymRepository.gyms.push({
      title: "Ruby",
      latitude: new Decimal(-22.9068),
      longitude: new Decimal(-43.1729),
      description: "",
      phone: "",
    });

    const fetchNearbyGyms = await fetchNearbyGymsUseCase.execute({
      userLatitude: -99.3123,
      userLongitude: -93.2133,
    });

    expect(fetchNearbyGyms).toHaveLength(0)
  });
});
