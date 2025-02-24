import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION_TOKEN } from 'src/db.module';
import type { PoolClient } from 'pg';
import { DateTime } from 'luxon';
import { BookedSlotDto, SlotDto } from 'src/types';

@Injectable()
export class SlotsRepository {
    constructor(@Inject(PG_CONNECTION_TOKEN) private db: PoolClient) { }

    async getSlots(from: DateTime, to: DateTime): Promise<SlotDto[]> {
        const query = `
            SELECT * 
            FROM slots 
            WHERE start_date > $1 and start_date < $2`;
        const fromIso = from.toISO();
        const toIso = to.toISO();
        const queryResult = await this.db.query(query, [fromIso, toIso]);
        return queryResult.rows;
    }

    async bookSlot(id: number, name: string): Promise<BookedSlotDto | undefined> {
        const query = `
            UPDATE slots 
            SET booked = true, booked_by = $2 
            WHERE id = $1
            RETURNING id, start_date, booked`;
        const queryResult = await this.db.query(query, [id, name]);
        return queryResult.rows[0];
    }
}
