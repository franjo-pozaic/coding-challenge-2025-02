import { Body, Controller, Get, NotFoundException, Param, ParseDatePipe, ParseIntPipe, Post, Query, Req, Response } from '@nestjs/common';
import { SlotsService } from './slots.service';
import { ParseUtcDatePipe } from 'src/pipes/ParseUtcDatePipe';
import { DateTime } from 'luxon';
import { BookingDto, BookedSlotDto, SlotDto } from 'src/types';
import { ValidateBookingDto } from 'src/pipes/ValidateBookingDto';

@Controller('slots')
export class SlotsController {
    constructor(private slotsService: SlotsService) {}

    @Get()
    async findAll(
        @Query('date', new ParseUtcDatePipe()) date: DateTime
    ): Promise<SlotDto[]> {
        return this.slotsService.findSlots(date);
    }

    @Post(':id/book')
    async bookSlot(@Param('id', ParseIntPipe) id: number, @Body(ValidateBookingDto) booking: BookingDto): Promise<BookedSlotDto> {
        const bookingResponse = await this.slotsService.bookSlot(id, booking.name);
        
        if (!bookingResponse) {
            throw new NotFoundException(`Slot with id ${id} not found`);
        }

        return bookingResponse;
    }
}
