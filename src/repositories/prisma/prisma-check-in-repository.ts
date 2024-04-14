import { ICheckIn } from "src/entitys/check-in";
import { CheckInsRepositorys } from "../check-ins-repository";
import { prisma } from "src/lib/prisma";
import dayjs from "dayjs";

class PrismaCheckInRepository implements CheckInsRepositorys {
  public async create({ userId, gymId }: ICheckIn) {
    const checkIn = await prisma.checkIn.create({
      data: {
        gymId,
        userId,
        created_at: new Date(),
        validated_at: null,
      },
    });

    return checkIn;
  }

  public async findByUserIdOnDate(userId: string, date: Date) {
    const startDate = dayjs(date).startOf("date").toDate()
    const endDate = dayjs(date).endOf("date").toDate()

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        userId,
        created_at: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    return checkIn
  }
}

export default new PrismaCheckInRepository();