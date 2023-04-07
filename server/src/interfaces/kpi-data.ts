import { Kpi } from "src/kpi/entities/kpi.entity";

export interface kpiDataInterface {
    
    date: Date|string;

    kpiDrillDownLevel1 : string

    kpiDrillDownLevel2 : string

    version : string

    nominator : Number|string

    denominator : Number|string


  }