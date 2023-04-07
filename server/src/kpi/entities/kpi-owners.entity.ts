import {BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

import {User} from "../../user/user.entity";
import { Kpi } from "src/kpi/entities/kpi.entity";


@Entity()
export class KpiOwners extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Kpi, entity => entity.owner)
    @JoinColumn()
    kpi: Kpi;

    @ManyToOne(type => User, entity => entity.kpi)
    @JoinColumn()
    owner: User;
}