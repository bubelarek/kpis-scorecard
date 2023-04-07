import {BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";


import { Team } from "src/team/entities/team.entity";
import { Kpi } from "src/kpi/entities/kpi.entity";

@Entity()
export class KpiInTeam extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;


    @ManyToOne(type => Team, entity => entity.user)
    @JoinColumn()
    team: Team;

    @ManyToOne(type => Kpi, entity => entity.team)
    @JoinColumn()
    kpi: Kpi;
}