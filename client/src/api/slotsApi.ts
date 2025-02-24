import { BookedSlotDto, BookSlotDto, SlotDto } from "../types";

export async function fetchSlots(dateIsoString: string): Promise<SlotDto[]> {
    const response = await fetch(`http://localhost:3000/slots?date=${dateIsoString}`);
    if (!response.ok) {
        throw new Error('Failed to fetch');
    }
    return response.json();
}

export async function bookSlot(id: number, name: string): Promise<BookedSlotDto> {
    const payload: BookSlotDto = {
        name
    }
    const response = await fetch(`http://localhost:3000/slots/${id}/book`,
        {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (!response.ok) {
        throw new Error('Failed to fetch');
    }

    return response.json();
}