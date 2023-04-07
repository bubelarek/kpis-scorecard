import { Inject, Injectable, Options } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';
import { UserService } from '../user/user.service'
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { UserInTeam } from './entities/user-in-team.entity';
import { operationFailed, operationSuccessed } from 'src/interfaces/operation-status';
import { KpiInTeam } from './entities/kpi-in-team.entity';
import { Kpi } from 'src/kpi/entities/kpi.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class TeamService {

  constructor(@Inject(UserService) private userService: UserService)
  {
    
    };
 
  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    const team = new Team();
    team.name = createTeamDto.name;
    team.description = createTeamDto.description;
    await team.save();
    return team;
  }

  async findAll() : Promise<Team[]> {
    return (await Team.find( {
      relations: ['user', 'kpi']})
      );
  }

  async findOne(id: string) : Promise<Team> {
    return await Team.findOne(id, {
      relations: ['user', 'kpi']});
  }

  async update(id: string, updateTeamDto: UpdateTeamDto) : Promise<Team | Error> {
    
  try{

    const team = await Team.findOneOrFail(id);
    await Team.update(id, updateTeamDto);
    await team.reload();
    return team;

  }
  catch(e) {
    return new Error("Error");
  }

  }

  async remove(id: string): Promise<Team | Error> {
    try{
      const team = await Team.findOneOrFail(id);
      await team.remove();
      return team;
  
    }
    catch(e) {
      return new Error("Error");
    }
  
  }


  async removeUser(id: string, user: string) : Promise<operationSuccessed|operationFailed> {

    
    const assigments =  await UserInTeam.findOne(
      {
        where : {
          user,
          team : id
        },
        //relations: ['user','team']
      });

      

      if(assigments) {

        await assigments.remove();
        return ({
          isSuccess : true
        });

      } else {

        return ({
          isSuccess : false, 
          message : "User was not having access to this team."
        });
      }
        

  }

  async addUser(id: string, user: string) : Promise<operationSuccessed|operationFailed> {

    const team = await Team.findOne(id);
    const userToAdd = await User.findOne(user);



    if(userToAdd && team) {
      
      const existingAssigment = await UserInTeam.findOne( {
          where : {
            user : userToAdd,
            team : team
          }
        });
      
      if(existingAssigment) {   return ({
        isSuccess : true
      });
      };
      
      // if not add new assigment

      const userInTeam = new UserInTeam();
      userInTeam.user = userToAdd;
      userInTeam.team =  team;
      //userInTeam.role =  'user';
      await userInTeam.save({ reload : true});
      
      return ({
        isSuccess : true
      });


    } else {

      return ({
        isSuccess : false,
        message: userToAdd?`User ${user} do not exists. `:''+team?`Team ${id}do not exists.`:'',
      });

    }
  }

  async removeKpi(id: string, kpi: string) : Promise<operationSuccessed|operationFailed> {

    
    const assigments =  await KpiInTeam.findOne(
      {
        where : {
          kpi,
          team : id
        },
        //relations: ['user','team']
      });

      

      if(assigments) {

        await assigments.remove();
        return ({
          isSuccess : true
        });

      } else {

        return ({
          isSuccess : false, 
          message : "Team is not having access to this KPI."
        });
      }
        

  }

  async addKpi(id: string, kpi: string) : Promise<operationSuccessed|operationFailed> {

    const team = await Team.findOne(id);
    console.log('A')
    console.log(team)
    const kpiToAdd = await Kpi.findOne(kpi);



    if(kpiToAdd && team) {
      
      const existingAssigment = await KpiInTeam.findOne( {
          where : {
            kpi : kpiToAdd,
            team : team
          }
        });
      
      if(existingAssigment) {   return ({
        isSuccess : true
      });
      };
      
      // if not add new assigment

      const kpiInTeam = new KpiInTeam();
      kpiInTeam.kpi = kpiToAdd;
      kpiInTeam.team =  team;
      //userInTeam.role =  'user';
      await kpiInTeam.save();
      
      return ({
        isSuccess : true
      });


    } else {

      return ({
        isSuccess : false,
        message: kpiToAdd?`Kpi ${kpi} do not exists. `:''+team?`Team ${id}do not exists.`:'',
      });

    }
  }

}
