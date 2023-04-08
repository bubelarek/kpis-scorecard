import {BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { KpiInTeam } from "src/team/entities/kpi-in-team.entity";
import { User } from "src/user/user.entity";
import { KpiOwners } from "./kpi-owners.entity";
import { KpiData } from "src/kpi-data/entities/kpi-data.entity";
import { KpiCalculationLogic } from "src/interfaces/kpi";

@Entity()
export class Kpi extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 255,
    })
    name: string;

    @Column()
    description: string;

    @Column({
        default : 1
    })
    caculationLogic : KpiCalculationLogic;


    @OneToMany(type => KpiInTeam, entity => entity.kpi)
    team: KpiInTeam[];


    @OneToMany(type => KpiOwners, entity => entity.kpi)
    owner: User[];

    @OneToMany(type => KpiData, entity => entity.kpi)
    kpiData : KpiData[];


}