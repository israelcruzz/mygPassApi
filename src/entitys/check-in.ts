export interface ICheckIn {
    id?: string
    created_at?: Date
    validated_at?: Date | null
    userId: string
    gymId: string
}