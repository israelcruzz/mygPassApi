import { describe, expect, it } from "vitest";
import { GetUserCheckInsMetricUseCase } from "./get-user-checkIns-metric";
import inMemoryCheckInRepository from "src/repositories/in-memory/in-memory-check-in-repository";

describe("Get User Check-ins Metric Count Use Case", () => {
  it("should be able to count check-ins", async () => {
    const getUserCheckInsMetricUseCase = new GetUserCheckInsMetricUseCase(
      inMemoryCheckInRepository
    );

    for (let i = 0; i <= 10; i++) {
      inMemoryCheckInRepository.checkIns.push({
        userId: "0000",
        gymId: "01",
      });
    }

    const countUserCheckIns = await getUserCheckInsMetricUseCase.execute({
      userId: "0000",
    });

    expect(countUserCheckIns).toBe(11);
  });
});
