import { Kpi } from "src/kpi/entities/kpi.entity";


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


export interface kpiDataInterface {
    
    date: Date;

    kpiDrillDownLevel1 : string

    kpiDrillDownLevel2 : string

    version : KpiVersion

    nominator : Number

    denominator : Number


  }