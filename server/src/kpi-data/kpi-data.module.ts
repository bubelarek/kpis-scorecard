import { Module } from '@nestjs/common';
import { KpiDataService } from './kpi-data.service';
import { KpiDataController } from './kpi-data.controller';

@Module({
  controllers: [KpiDataController],
  providers: [KpiDataService]
})
export class KpiDataModule {}
