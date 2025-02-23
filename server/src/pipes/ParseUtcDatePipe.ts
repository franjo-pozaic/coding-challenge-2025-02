import { BadRequestException } from "@nestjs/common";
import { DateTime } from "luxon";

export class ParseUtcDatePipe {
    transform(value: string): DateTime {
        if (!value) {
          throw new BadRequestException('Date value is required');
        }

        const date = DateTime.fromISO(value, { zone: 'utc' });

        if (!date.isValid) {
            throw new BadRequestException('Invalid date format');
        }
        
        return date;
      }
}