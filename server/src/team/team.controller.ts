import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('team')
@UseGuards(AuthGuard('jwt'))
export class TeamController {
  constructor(private readonly teamService: TeamService) {}
  
  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.create(createTeamDto);
  }

  @Get()
  findAll() {
    return this.teamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamService.findOne(id);
  }

  
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateTeamDto
    ){
    
    return this.teamService.update(id,body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamService.remove(id);
  }

  @Put(':id/user/:user')
  addUser(@Param('id') id: string, @Param('user') user: string) {
    
    return this.teamService.addUser(id, user);
  }

  @Delete(':id/user/:user')
  removeUser(@Param('id') id: string, @Param('user') user: string) {
    return this.teamService.removeUser(id,user);
  }

  @Put(':id/kpi/:kpi')
  addKpi(@Param('id') id: string, @Param('kpi') kpi: string) {
    
    return this.teamService.addKpi(id, kpi);
  }

  @Delete(':id/kpi/:kpi')
  removeKpi(@Param('id') id: string, @Param('kpi') kpi: string) {
    return this.teamService.removeKpi(id,kpi);
  }



}
