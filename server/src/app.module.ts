import { Module } from '@nestjs/common';
import { AppointmentBookingModule } from './modules/appointment-booking/appointment-booking.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AppointmentBookingModule,
    ConfigModule.forRoot()
  ]
})
export class AppModule {}
