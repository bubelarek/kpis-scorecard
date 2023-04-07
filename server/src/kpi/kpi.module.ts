import {forwardRef, Module} from '@nestjs/common';
import {KpiController} from "./kpi.controller";
import {KpiService} from "./kpi.service";
import {UserModule} from "../user/user.module";


@Module({
    imports: [
        forwardRef(() => UserModule),
    ],
    controllers: [KpiController],
    providers: [KpiService],
    exports: [KpiService],
})
export class KpiModule {
}
