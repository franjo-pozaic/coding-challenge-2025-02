import { Test, TestingModule } from '@nestjs/testing';
import { SlotsService } from './slots.service';
import { SlotsRepository } from './slots.repository';
import { DateTime } from 'luxon';
import { SlotDto } from 'src/types';

const mockSlots: SlotDto[] = [
  {
    booked: false,
    id: 1,
    start_date: '1'
  },
  {
    booked: false,
    id: 2,
    start_date: '2'
  },
  {
    booked: false,
    id: 3,
    start_date: '3'
  }
] 

describe('SlotsService', () => {
  let service: SlotsService;
  let slotsRepository: jest.Mocked<SlotsRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SlotsService, 
        { 
          provide: SlotsRepository, 
          useValue: {
            getSlots: jest.fn().mockResolvedValue(mockSlots),
            bookSlot: jest.fn().mockResolvedValue(undefined),
          }, 
        }
      ],
    }).compile();

    slotsRepository = module.get<jest.Mocked<SlotsRepository>>(SlotsRepository);
    service = module.get<SlotsService>(SlotsService);
  });

  afterEach(() => {
    slotsRepository.getSlots.mockClear();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findSlots', () => {
    const jsDate = new Date(2025, 1,1, 17, 0);
    const exampleDate = DateTime.fromJSDate(jsDate);
    let result: SlotDto[];

    beforeEach(async () => {
      result = await service.findSlots(exampleDate);
    });

    it('should call the repository method once', () => {
      expect(slotsRepository.getSlots).toHaveBeenCalledTimes(1);
    });

    it('should call the repository method with the correct params', () => {
      const expectedFrom = DateTime.fromJSDate(new Date(2025, 1,1, 17, 0));
      const expectedTo = DateTime.fromJSDate(new Date(2025, 1, 2, 16, 59, 59));
      expect(slotsRepository.getSlots).toHaveBeenCalledWith(expectedFrom, expectedTo);
    });

    it('should return the correct data', () => {
      expect(result).toEqual(mockSlots);
    });
  });
});
