import { Injectable } from '@nestjs/common';
import { SlotsRepository } from './slots.repository';
import { DateTime } from 'luxon';
import { SlotDto } from 'src/types';

@Injectable()
export class SlotsService {
    constructor(private slotsRepository: SlotsRepository) { }

    async findSlots(date: DateTime): Promise<SlotDto[]> {
        const utcDayStart = date;
        const utcDayEnd = date.plus({ days: 1 }).minus({ seconds: 1 });

        return this.slotsRepository.getSlots(utcDayStart, utcDayEnd);
    }

    async bookSlot(id: number, name: string) {
        return this.slotsRepository.bookSlot(id, name);
    }
}
