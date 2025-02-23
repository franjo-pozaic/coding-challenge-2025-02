import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { BookingDto } from 'src/models/bookingDto';

@Injectable()
export class ValidateBookingDto implements PipeTransform<unknown, BookingDto | never> {
  transform(value: any) {
    if (value && value.name && typeof value.name === 'string') {
        return value as BookingDto;
    } else {
        throw new BadRequestException('Request body invalid');
    }
  }
}