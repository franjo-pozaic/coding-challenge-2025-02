import { Injectable } from '@nestjs/common';

@Injectable()
export class SlotsService {
    findSlots() {
        return [
            { "id": 1, "start_date": "2024-05-01T09:00:00.000Z", "booked": false }, 
            { "id": 2, "start_date": "2024-05-01T10:00:00.000Z", "booked": true }
        ]
    }
}
