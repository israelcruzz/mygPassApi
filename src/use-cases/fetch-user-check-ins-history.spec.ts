import { describe, expect, it } from "vitest";
import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history";
import inMemoryCheckInRepository from "src/repositories/in-memory/in-memory-check-in-repository";
import { ICheckIn } from "src/entitys/check-in";

describe("Create Gym Use Case", () => {
  it("should be able to creat gym", async () => {
    const fetchUserCheckInsHistoryUseCase = new FetchUserCheckInsHistoryUseCase(
      inMemoryCheckInRepository
    );

    for (let i = 0; i <= 40; i++) {
      inMemoryCheckInRepository.checkIns.push({
        gymId: `gym-${i}`,
        userId: "user-test-history",
      });
    }

    const fetchHistoryUserCheckIns: ICheckIn[] = await fetchUserCheckInsHistoryUseCase.execute({
        userId: 'user-test-history',
        page: 1
    });

    expect(fetchHistoryUserCheckIns).toHaveLength(20)
  });
});
