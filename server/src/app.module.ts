import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from './user/user.module';
import {KpiModule} from "./kpi/kpi.module";
import {ConsoleModule} from "nestjs-console";
import { TeamModule } from './team/team.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),

        KpiModule,
        UserModule,
        ConsoleModule,
        TeamModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
