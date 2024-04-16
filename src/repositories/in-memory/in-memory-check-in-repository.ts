import { ICheckIn } from "src/entitys/check-in";
import { CheckInsRepositorys } from "../check-ins-repository";
import dayjs from "dayjs";

class InMemoryCheckInRepository implements CheckInsRepositorys {
  public checkIns: ICheckIn[] = [];

  public async create({ userId, gymId }: ICheckIn) {
    new Promise((resolve) => setTimeout(resolve, 10));

    const checkIn: ICheckIn = {
      userId,
      gymId,
      created_at: new Date(),
      validated_at: null,
    };

    this.checkIns.push(checkIn);

    return checkIn;
  }

  public async findByUserIdOnDate(userId: string, date: Date) {
    new Promise((resolve) => setTimeout(resolve, 10));

    const startOfDay = dayjs(date).startOf("date");
    const endOfDay = dayjs(date).endOf("date");

    const checkInExist = this.checkIns.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at);
      const isSameCheckInDate =
        checkInDate.isAfter(startOfDay) && checkInDate.isBefore(endOfDay);

      return checkIn.userId === userId && isSameCheckInDate;
    });

    return checkInExist;
  }

  public async findManyUserId(userId: string, page: number) {
    new Promise((resolve) => setTimeout(resolve, 10));

    const historyCheckIns = this.checkIns
      .filter((checkIn) => checkIn.userId === userId)
      .slice((page - 1) * 20, page * 20);

    return historyCheckIns;
  }

  public async findUserCountCheckIns(userId: string) {
    new Promise((resolve) => setTimeout(resolve, 10));

    const countUserCheckIns = this.checkIns.filter(
      (checkIn) => checkIn.userId === userId
    );

    return countUserCheckIns.length;
  }

  public async findCheckInById(checkInId: string) {
    new Promise((resolve) => setTimeout(resolve, 10));

    const checkIn = this.checkIns.find((checkIn) => checkIn.id === checkInId);

    return checkIn;
  }

  public async save(checkIn: ICheckIn) {
    const checkInUpdate = this.checkIns.findIndex(
      (checkInUpt) => checkInUpt.id === checkIn.id
    );

    if (checkInUpdate >= 1) {
      this.checkIns[checkInUpdate] = checkIn;
    }

    return checkIn;
  }
}

export default new InMemoryCheckInRepository();
