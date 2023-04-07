import {Inject, Injectable} from '@nestjs/common';
import {AddKpiDto} from './dto/add-kpi.dto';
import {UserService} from "../user/user.service";
import {Kpi} from './entities/kpi.entity';
import { UpdateKpiDto } from './dto/edit-kpi.dto';
import { operationFailed, operationSuccessed } from 'src/interfaces/operation-status';
import { User } from 'src/user/user.entity';
import { KpiOwners } from './entities/kpi-owners.entity';

@Injectable()
export class KpiService {
  

    constructor(
        @Inject(UserService) private userService: UserService
    ) {
    }


    
    async findAll() : Promise<Kpi[]> {
        return (await Kpi.find( {
            relations: ['owner','team','report']})
        );
    }

    async findOne(id: string) : Promise<Kpi> {
        return await Kpi.findOne(id, {
        relations: ['owner','team','report']});
    }


    async add(kpi: AddKpiDto): Promise<Kpi> {
       
        const newKpi = new Kpi()
        newKpi.name = kpi.name;
        newKpi.description = kpi.description;
        await newKpi.save();
        return newKpi;
    }

    async update(id: string, updateKpiDto: UpdateKpiDto) : Promise<Kpi | Error> {
    
        try{
      
          const kpi = await Kpi.findOneOrFail(id);
          await Kpi.update(id, updateKpiDto);
          await kpi.reload();
          return kpi;
      
        }
        catch(e) {
          return new Error("Error");
        }

    }

    async delete(id: string): Promise<Kpi | Error> {
        try{
          const kpi = await Kpi.findOneOrFail(id);
          await kpi.remove();
          return kpi;
      
        }
        catch(e) {
          return new Error("Error");
        }
      
      }

      async removeOwner(id: string, user: string) : Promise<operationSuccessed|operationFailed> {

    
        const kpi =  await KpiOwners.find(
          {
            where : {
                kpi : id,
                owner : user 
            },
            //relations: ['user','team']
          });
    
          
    
          if(kpi) {
    
            await Promise.all( kpi.map( async e => await e.remove()) ) 
            return ({
              isSuccess : true
            });
    
          } else {
    
            return ({
              isSuccess : false, 
              message : "User do not exist as owner of this KPI."
            });
          }
            
    
      }
    
      async addOwner(id: string, user: string) : Promise<operationSuccessed|operationFailed> {
    
        const kpi = await Kpi.findOne(id, {
            relations : ['owner']
        });
        const userToAdd = await User.findOne(user);
       
    
    
        if(userToAdd && kpi) {
          
          const existingAssigment = await KpiOwners.findOne({
            where : {
                kpi : kpi,
                owner : userToAdd
            }
          })
          
          if(existingAssigment) {   return ({
            isSuccess : true
          });
          };
          
          // if not add new assigment
    
          const kpiOwner = new KpiOwners();
          kpiOwner.kpi = kpi;
          kpiOwner.owner = userToAdd;
          
        
          await kpiOwner.save();
          
          return ({
            isSuccess : true
          });
    
    
        } else {
    
          return ({
            isSuccess : false,
            message: userToAdd?`User ${user} do not exists. `:''+kpi?`Kpi ${id}do not exists.`:'',
          });
    
        }
      }

}
