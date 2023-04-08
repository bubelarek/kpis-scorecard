import { Injectable } from '@nestjs/common';
import { CreateKpiDatumDto } from './dto/create-kpi-data.dto';
import { KpiData } from './entities/kpi-data.entity';
import { Kpi } from 'src/kpi/entities/kpi.entity';
import { KpiVersion } from 'src/interfaces/kpi';


@Injectable()
export class KpiDataService {


  async findOneKpi(kpi: string): Promise<KpiData[]> {

    return (await KpiData.find(
      {
        where : {
          kpi,
          softDeleted : false,
        }
      }
      ))
  }

  async createOrUpdate(kpi: string, createKpiDatumDto: CreateKpiDatumDto) : Promise<KpiData[]> {
    console.log({kpi, createKpiDatumDto})

    const results = await Promise.all(createKpiDatumDto.map( async (e) => {

      
        const date = new Date(Date.parse(String(e.date)));

        const {kpiDrillDownLevel1, kpiDrillDownLevel2, version} = e;

        const kpiEntity = await Kpi.findOne(kpi);

        // find all existing version of same data
        // they will be soft deleted after new data is saved
        const existingData = await KpiData.find({
          where : {
            kpi,
            date,
            version,
            kpiDrillDownLevel1,
            kpiDrillDownLevel2,
            softDeleted : false
          }
        });
       
        const kpiData = new KpiData(); 
        kpiData.softDeleted = false;
        kpiData.uploadedAt = new Date();
        kpiData.version = e.version;
        kpiData.date = date;
        kpiData.denominator = Number(e.denominator);
        kpiData.nominator = Number(e.denominator);
        kpiData.kpiDrillDownLevel1 = e.kpiDrillDownLevel1;
        kpiData.kpiDrillDownLevel2 = e.kpiDrillDownLevel2;
        kpiData.kpi = await Kpi.findOne(kpi);
        await kpiData.save();

        //soft deleting after uploading new data
        if(existingData.length >= 1) {
            await KpiData.update(existingData.map(e => e.id),{ softDeleted : true});
        }

        return kpiData;
      

      }
    ))

    
    
    return results
  }

}
