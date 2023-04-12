import {Body, Controller, Delete, Get, Inject,Param,Post, Put, UseGuards} from '@nestjs/common';
import {KpiService} from './kpi.service';
import {AddKpiDto} from './dto/add-kpi.dto';
import { Kpi } from './entities/kpi.entity';
import { UpdateKpiDto } from './dto/edit-kpi.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('kpi')
@UseGuards(AuthGuard('jwt'))
export class KpiController {

    constructor(
        @Inject(KpiService) private kpiService: KpiService,
    ) {
    }


    @Post('/')
    addKpi(@Body() kpi: AddKpiDto,
    ): Promise<Kpi> {
        return this.kpiService.add(kpi);
    }

    @Put('/:id')
    updateKpi(
        @Param('id') id: string,
        @Body() kpi: UpdateKpiDto,
    ): Promise<Kpi|Error> {
        return this.kpiService.update(id,kpi);
    }

    
    @Get()
    findAll() {
        return this.kpiService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.kpiService.findOne(id);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.kpiService.delete(id);
    }

    @Put(':id/owner/:user')
    addOwner(@Param('id') id: string, @Param('user') kpi: string) {
      return this.kpiService.addOwner(id, kpi);
    }
  
    @Delete(':id/owner/:user')
    removeOwner(@Param('id') id: string, @Param('user') kpi: string) {
      return this.kpiService.removeOwner(id,kpi);
    }

}
