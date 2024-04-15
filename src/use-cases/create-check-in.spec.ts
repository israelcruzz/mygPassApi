import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { CreateCheckInUseCase } from "./create-check-in";
import InMemoryCheckInRepository from "src/repositories/in-memory/in-memory-check-in-repository";
import inMemoryGymRepository from "src/repositories/in-memory/in-memory-gym-repository";
import { Decimal } from "@prisma/client/runtime/library";

describe("Check-in Use Case", () => {
  beforeEach(() => {
    inMemoryGymRepository.gyms.push({
      id: "node-gym",
      title: "Nodejs Gym",
      description: "gym for devlopers backend!",
      phone: "11 1111-1111",
      latitude: 0,
      longitude: 0,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to create check-in", async () => {
    const checkInUseCase = new CreateCheckInUseCase(
      InMemoryCheckInRepository,
      inMemoryGymRepository
    );

    const checkIn = await checkInUseCase.execute({
      gymId: "node-gym",
      userId: "1",
      userLatitude: new Decimal(0),
      userLongitude: new Decimal(0),
    });

    expect(checkIn.id);
  });

  it("should be able to make check-in in days different", async () => {
    vi.setSystemTime(new Date(2024, 11, 24, 8, 0, 0));

    const checkInUseCase = new CreateCheckInUseCase(
      InMemoryCheckInRepository,
      inMemoryGymRepository
    );

    await checkInUseCase.execute({
      userId: "check-test",
      gymId: "node-gym",
      userLatitude: new Decimal(0),
      userLongitude: new Decimal(0),
    });

    vi.setSystemTime(new Date(2024, 12, 24, 8, 0, 0));

    const checkIn = await checkInUseCase.execute({
      userId: "check-test",
      gymId: "node-gym",
      userLatitude: new Decimal(0),
      userLongitude: new Decimal(0),
    });

    expect(checkIn.userId).toEqual(expect.any(String));
  });

  it("not should be able to make check-in on same day", async () => {
    vi.setSystemTime(new Date(2024, 11, 24, 8, 0, 0));

    const checkInUseCase = new CreateCheckInUseCase(
      InMemoryCheckInRepository,
      inMemoryGymRepository
    );

    await checkInUseCase.execute({
      userId: "check-test-2",
      gymId: "node-gym",
      userLatitude: new Decimal(0),
      userLongitude: new Decimal(0),
    });

    await expect(() =>
      checkInUseCase.execute({
        userId: "check-test-2",
        gymId: "node-gym",
        userLatitude: new Decimal(0),
        userLongitude: new Decimal(0),
      })
    ).rejects.toThrow();
  });

  it("should not be able to make check-in if are far away from the gym", async () => {
    const checkInUseCase = new CreateCheckInUseCase(
      InMemoryCheckInRepository,
      inMemoryGymRepository
    );

    await expect(() =>
      checkInUseCase.execute({
        userId: "check-test-2",
        gymId: "node-gym",
        userLatitude: new Decimal(-23.5173943),
        userLongitude: new Decimal(-46.4862603),
      })
    ).rejects.toThrow();
  });
});
