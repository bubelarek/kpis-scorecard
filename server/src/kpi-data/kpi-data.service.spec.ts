import { Test, TestingModule } from '@nestjs/testing';
import { KpiDataService } from './kpi-data.service';

describe('KpiDataService', () => {
  let service: KpiDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KpiDataService],
    }).compile();

    service = module.get<KpiDataService>(KpiDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
