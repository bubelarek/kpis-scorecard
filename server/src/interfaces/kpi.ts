import { Kpi } from "src/kpi/entities/kpi.entity";
import { IsString, IsInt, IsDate } from 'class-validator';

export enum KpiVersion {
  ACTUAL = 1,
  FORECAST,
  TARGET,
}

export enum KpiCalculationLogic{
  SUM_NOMINATOR = 1,
  PERCENTAGE_RATIO_SUM_NOMINATOR_DENOMINATOR,
  AVERAGE_SUM_NOMINATOR_DENOMINATOR,
}


export class kpiDataInterface {
    
    @IsDate()
    date: Date;

    @IsString()
    kpiDrillDownLevel1 : string;

    @IsString()
    kpiDrillDownLevel2 : string;

    @IsInt()
    version : KpiVersion;

    @IsInt()
    nominator : Number;

    @IsInt()
    denominator : Number;

  }