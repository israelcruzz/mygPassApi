import { ICheckIn } from "src/entitys/check-in";

export interface CheckInsRepositorys {
    create({ userId, gymId }: ICheckIn): Promise<ICheckIn>
    findByUserIdOnDate(userId: string, date: Date): Promise<ICheckIn | undefined | null>
    findManyUserId(userId: string, page: number): Promise<ICheckIn[]>
    findUserCountCheckIns(userId: string): Promise<number>
}