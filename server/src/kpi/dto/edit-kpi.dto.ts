import { PartialType } from '@nestjs/mapped-types';
import { AddKpiDto } from './add-kpi.dto';

export class UpdateKpiDto extends PartialType(AddKpiDto) {
}