export type SlotDto = {
    id: number,
    start_date: string,
    booked: boolean
}

export type BookedSlotDto = SlotDto & { booked: true }