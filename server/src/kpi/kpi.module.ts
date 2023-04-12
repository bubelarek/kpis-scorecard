import {forwardRef, Module} from '@nestjs/common';
import {KpiController} from "./kpi.controller";
import {KpiService} from "./kpi.service";
import {UserModule} from "../user/user.module";
import { KpiData } from 'src/kpi-data/entities/kpi-data.entity';


@Module({
    imports: [
        forwardRef(() => UserModule),
        forwardRef(() => KpiData),
    ],
    controllers: [KpiController],
    providers: [KpiService],
    exports: [KpiService],
})
export class KpiModule {
}
