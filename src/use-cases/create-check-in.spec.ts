import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { CreateCheckInUseCase } from "./create-check-in";
import InMemoryCheckInRepository from "src/repositories/in-memory/in-memory-check-in-repository";

describe("Check-in Use Case", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to create check-in", async () => {
    const checkInUseCase = new CreateCheckInUseCase(InMemoryCheckInRepository);

    const checkIn = await checkInUseCase.execute({
      gymId: "gym-01",
      userId: "1",
    });

    expect(checkIn.id);
  });

  it("should be able to make check-in in days different", async () => {
    vi.setSystemTime(new Date(2024, 11, 24, 8, 0, 0));

    const checkInUseCase = new CreateCheckInUseCase(InMemoryCheckInRepository);

    await checkInUseCase.execute({
      userId: "check-test",
      gymId: "gym-id",
    });

    vi.setSystemTime(new Date(2024, 12, 24, 8, 0, 0));

    const checkIn = await checkInUseCase.execute({
      userId: "check-test",
      gymId: "gym-id",
    });

    expect(checkIn.userId).toEqual(expect.any(String));
  });

  it("not should be able to make check-in on same day", async () => {
    vi.setSystemTime(new Date(2024, 11, 24, 8, 0, 0));

    const checkInUseCase = new CreateCheckInUseCase(InMemoryCheckInRepository);

    await checkInUseCase.execute({
      userId: "check-test-2",
      gymId: "gym-id",
    });

    await expect(() =>
      checkInUseCase.execute({
        userId: "check-test-2",
        gymId: "gym-id",
      })
    ).rejects.toThrow()
  });
});
