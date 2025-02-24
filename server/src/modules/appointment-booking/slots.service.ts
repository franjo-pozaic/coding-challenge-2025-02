import { Injectable } from '@nestjs/common';
import { SlotsRepository } from './slots.repository';
import { DateTime } from 'luxon';
import { SlotDto } from 'src/types';

@Injectable()
export class SlotsService {
    constructor(private slotsRepository: SlotsRepository) { }

    async findSlots(date: DateTime): Promise<SlotDto[]> {
        const utcStart = date;
        const utcEnd = date.plus({ days: 1 }).minus({ seconds: 1 });

        const slots = await this.slotsRepository.getSlots(utcStart, utcEnd);
        
        return slots.map(x => ({
            id: x.id,
            booked: x.booked,
            start_date: x.start_date
        }));
    }

    async bookSlot(id: number, name: string) {
        return this.slotsRepository.bookSlot(id, name);
    }
}
