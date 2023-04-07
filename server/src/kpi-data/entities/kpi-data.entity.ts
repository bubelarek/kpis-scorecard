import { User } from "src/user/user.entity";
import { Kpi } from "src/kpi/entities/kpi.entity"
import { BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, SaveOptions, Index, Entity } from "typeorm";
import { kpiDataInterface } from "src/interfaces/kpi-data";

@Entity()
export class KpiData  extends BaseEntity implements kpiDataInterface {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type : "datetime"
    })
    @Index()
    date: Date;

    @Column()
    kpiDrillDownLevel1 : string

    @Column()
    kpiDrillDownLevel2 : string

    @Column()
    version : string

    @Column()
    nominator : Number

    @Column()
    denominator : Number

    @Column({
        type : "datetime"
    })
    uploadedAt : Date

/*     @ManyToOne(type => User, entity => entity.id)
    @JoinColumn()
    user: User; */

    @Column({
        nullable : true
    })
    softDeleted : Boolean


    @ManyToOne(type => Kpi, entity => entity.id)
    @JoinColumn()
    kpi: Kpi


}
