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
}

export default new InMemoryCheckInRepository();
