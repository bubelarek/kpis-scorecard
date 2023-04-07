import {BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { UserInTeam } from "src/team/entities/user-in-team.entity";
import { Kpi } from "src/kpi/entities/kpi.entity";
import { KpiOwners } from "src/kpi/entities/kpi-owners.entity";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 255,
    })
    email: string;

    @Column()
    pwdHash: string;

    @Column({
        nullable: true,
        default: null,
    })
    currentTokenId: string | null;

    @Column({
        nullable: true,
        default: null,
    })
    resetPwdTokenHash: string | null;

    @OneToMany(type => UserInTeam, entity => entity.user)
    team: UserInTeam[];

    @ManyToOne(type => KpiOwners, entity => entity.owner)
    @JoinColumn()
    kpi: Kpi[];
}