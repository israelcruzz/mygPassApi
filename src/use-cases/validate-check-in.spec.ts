import { describe, expect, it, beforeEach, vi, afterEach } from "vitest";
import { ValidateCheckInUseCase } from "./validate-check-in";
import inMemoryCheckInRepository from "src/repositories/in-memory/in-memory-check-in-repository";

describe("Validate Check-in Use Case", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to validate check-in", async () => {
    const validateCheckInUseCase = new ValidateCheckInUseCase(
      inMemoryCheckInRepository
    );

    inMemoryCheckInRepository.checkIns.push({
      id: "validate-test",
      gymId: "gym-01",
      userId: "validate-test-user",
    });

    const checkInValidate = await validateCheckInUseCase.execute({
      checkInId: "validate-test",
    });

    if (checkInValidate instanceof Error) {
      return;
    }

    expect(checkInValidate.id).toEqual(expect.any(String));
  });

  it("should not be able to validate if check-in invalid", async () => {
    const validateCheckInUseCase = new ValidateCheckInUseCase(
      inMemoryCheckInRepository
    );

    await expect(
      validateCheckInUseCase.execute({
        checkInId: "validate-test-error",
      })
    ).rejects.toThrow();
  });

  it("should not be able to validate if the time to validate check-in has exceeded", async () => {
    vi.setSystemTime(new Date(2024, 11, 24, 8, 0, 0));
    const validateCheckInUseCase = new ValidateCheckInUseCase(
      inMemoryCheckInRepository
    );

    inMemoryCheckInRepository.checkIns.push({
      id: "validate-test-time",
      gymId: "gym-01",
      userId: "validate-test-user-time",
      created_at: new Date(),
    });

    vi.setSystemTime(new Date(2025, 11, 24, 8, 0, 0));

    await expect(() =>
      validateCheckInUseCase.execute({
        checkInId: "validate-test-time",
      })
    ).rejects.toThrow();
  });
});
