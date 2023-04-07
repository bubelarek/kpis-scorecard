import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

import {User} from "../../user/user.entity";
import { Team } from "src/team/entities/team.entity";

@Entity()
export class UserInTeam extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;


/*     
    @Column()
    role: string;
 */

    @ManyToOne(type => Team, entity => entity.user)
    @JoinColumn()
    team: Team;

    @ManyToOne(type => User, entity => entity.team)
    @JoinColumn()
    user: User;
}