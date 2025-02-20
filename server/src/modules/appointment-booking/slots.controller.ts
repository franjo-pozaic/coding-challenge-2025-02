import { Controller, Get } from '@nestjs/common';
import { SlotsService } from './slots.service';

@Controller('slots')
export class SlotsController {
    constructor(private slotsService: SlotsService) {}

    @Get()
    findAll() {
        return this.slotsService.findSlots();
        
    }
}
