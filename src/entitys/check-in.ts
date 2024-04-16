export interface ICheckIn {
    id?: string
    created_at?: Date
    validated_at?: Date | null | undefined
    userId: string
    gymId: string
}