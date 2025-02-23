import { Module } from '@nestjs/common';
import { SlotsService } from './slots.service';
import { SlotsController } from './slots.controller';
import { DbModule } from 'src/db.module';
import { SlotsRepository } from './slots.repository';

@Module({
  imports: [DbModule],
  controllers: [SlotsController],
  providers: [SlotsService, SlotsRepository]
})
export class AppointmentBookingModule {}
