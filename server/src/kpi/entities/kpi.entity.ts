import {BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { KpiInTeam } from "src/team/entities/kpi-in-team.entity";
import { User } from "src/user/user.entity";
import { KpiOwners } from "./kpi-owners.entity";

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


    @OneToMany(type => KpiInTeam, entity => entity.kpi)
    team: KpiInTeam[];


    @OneToMany(type => KpiOwners, entity => entity.kpi)
    owner: User[];

}