import {Injectable,Inject} from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import {RegisterDto} from "./dto/register.dto";
import {RegisterUserResponse, ResetPwdResponse} from "../interfaces/user";
import {User} from "./user.entity";
import {hashPwd} from "../utils/hash-pwd";
import {Command, Console} from "nestjs-console";


@Injectable()
@Console({
    name: 'users',
})

export class UserService {

    constructor(
        ) {
    };

    filterUserToRegisterUserResponse(user: User): RegisterUserResponse {
        const {id, email} = user;
        return {id, email};
    }

    async register(newUser: RegisterDto): Promise<RegisterUserResponse> {
        
        const sameEmailUser =  await User.count({
            where : {
                email : newUser.email
            }
        });

        if(sameEmailUser === 0){
            const user = new User();
            user.email = newUser.email;
            user.pwdHash = hashPwd(newUser.pwd);
            await user.save();
            return this.filterUserToRegisterUserResponse(user);
        } else {
            return ({
                isSuccess : false,
                message : "User with this e-mails alreayd exits."
            })
        }

    }

    async resetPwd(email: string): Promise<ResetPwdResponse> {
        const user = await User.findOne({email});
        if(user) {
            user.resetPwdTokenHash = hashPwd(uuidv4());
            await user.save();
            return ({
                isSuccess : true
            });
        } else {
            return ({
                isSuccess : false,
                message : `User with e-mail ${email} not found.`
            });
        }
        

    }


    async getOneUser(id: string): Promise<User> {
        return await User.findOne(id);
    }

    @Command({
        command: 'resetUsersPwd',
        description: 'Reset and send link to set-up new passwords',
    })
    async resetUsersPasswordsCmd() {
        console.log(
            (await User.find()).map(this.filterUserToRegisterUserResponse)
        );
    }


}