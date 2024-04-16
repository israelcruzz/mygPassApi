import { describe, expect, it } from "vitest";
import { ValidateCheckInUseCase } from "./validate-check-in";
import inMemoryCheckInRepository from "src/repositories/in-memory/in-memory-check-in-repository";

describe("Validate Check-in Use Case", () => {
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

    expect(checkInValidate.id).toEqual(expect.any(String));
  });
});
