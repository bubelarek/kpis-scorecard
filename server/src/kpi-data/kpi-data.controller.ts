import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { KpiDataService } from './kpi-data.service';
import { CreateKpiDatumDto } from './dto/create-kpi-data.dto';

@Controller('kpi-data')
export class KpiDataController {
  constructor(private readonly kpiDataService: KpiDataService) {}
  
  @Post('/:kpi')
  createOrUpdate(
    @Body() createKpiDatumDto: CreateKpiDatumDto,
    @Param('kpi') kpi : string
  ) {
    return this.kpiDataService.createOrUpdate(kpi,createKpiDatumDto);
  }



  @Get('/:kpi')
  findOneKpi(@Param('kpi') kpi : string) {
    return this.kpiDataService.findOneKpi(kpi);
  }

}
