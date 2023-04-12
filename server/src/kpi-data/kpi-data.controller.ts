import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { KpiDataService } from './kpi-data.service';
import { CreateKpiDatumDto } from './dto/create-kpi-data.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { AuthGuard } from '@nestjs/passport';

@Controller('kpi-data')
@UseGuards(AuthGuard('jwt'))
export class KpiDataController {
  constructor(private readonly kpiDataService: KpiDataService) {}
  
  @Post('/:kpi')
  createOrUpdate(
    @Body(new ValidationPipe()) createKpiDatumDto: CreateKpiDatumDto,
    @Param('kpi') kpi : string
  ) {
    return this.kpiDataService.createOrUpdate(kpi,createKpiDatumDto);
  }



  @Get('/:kpi')
  findOneKpi(@Param('kpi') kpi : string) {
    return this.kpiDataService.findOneKpi(kpi);
  }

}
