import {Body, Controller, Inject, Post} from '@nestjs/common';
import {RegisterUserResponse, ResetPwdResponse} from "../interfaces/user";
import {UserService} from "./user.service";
import {RegisterDto} from "./dto/register.dto";
import { ResetPwdDto } from './dto/reset-pwd.dto';
import { User } from './user.entity';

@Controller('user')
export class UserController {
    constructor(
        @Inject(UserService) private userService: UserService,
    ) {
    }

    @Post('/register')
    register(
        @Body() newUser: RegisterDto,
    ): Promise<RegisterUserResponse> {
        return this.userService.register(newUser);
    }

    @Post('/resetPwd')
    reset(
        @Body() resetPwdDto: ResetPwdDto,
    ): Promise<ResetPwdResponse> {
        return this.userService.resetPwd(resetPwdDto.email);
    }
}
