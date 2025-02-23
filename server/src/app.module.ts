import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentBookingModule } from './modules/appointment-booking/appointment-booking.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AppointmentBookingModule,
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
