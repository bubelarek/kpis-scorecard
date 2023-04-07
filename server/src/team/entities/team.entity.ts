import { UserInTeam } from "src/team/entities/user-in-team.entity";
import { User } from "src/user/user.entity";
import { KpiInTeam } from "src/team/entities/kpi-in-team.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Kpi } from "src/kpi/entities/kpi.entity";

@Entity()
export class Team extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id : string;
    
    @Column({
        length: 255,
    })
    name : string;

    @Column({
        length: 1000,
        nullable : true,
        default : ""
    })
    description : string;


    @OneToMany(type => UserInTeam, entity => entity.team)
    user: User[];

    @OneToMany(type => KpiInTeam, entity => entity.team)
    kpi: Kpi[];

}
