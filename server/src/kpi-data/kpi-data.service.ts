import { Injectable } from '@nestjs/common';
import { CreateKpiDatumDto } from './dto/create-kpi-data.dto';
import { KpiData } from './entities/kpi-data.entity';
import { KpiService } from 'src/kpi/kpi.service';
import { Kpi } from 'src/kpi/entities/kpi.entity';


@Injectable()
export class KpiDataService {

  findManyKpi() {
    return `This action returns all kpiData`;
  }

  async findOneKpi(kpi: string) {

    return (await KpiData.find(
      {
        where : {
          kpi
        }
      }
      ))
  }

  async createOrUpdate(kpi: string, createKpiDatumDto: CreateKpiDatumDto) {
    console.log({kpi, createKpiDatumDto})

    const results = await Promise.all(createKpiDatumDto.map( async (e) => {

      
      

        const kpi = new KpiData(); 
        //kpi.softDeleted = false;
        kpi.uploadedAt = new Date();
        kpi.date = new Date(Date.parse(String(e.date)));
        kpi.denominator = Number(e.denominator);
        kpi.nominator = Number(e.denominator);
        kpi.kpiDrillDownLevel1 = e.kpiDrillDownLevel1;
        kpi.kpiDrillDownLevel2 = e.kpiDrillDownLevel2;
        kpi.kpi = await Kpi.findOne(kpi);
        await kpi.save();
        return kpi;

      

      }
    ))

    
    return ({results,kpi, createKpiDatumDto})
  }

}
