import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {User,userDocument} from './user.schema';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel:Model<User>){}

    async findByEmail(email:string):Promise<userDocument|null>{
        return this.userModel.findOne({email}).exec()
    }

    async createUser(user:User):Promise<User>{
        const newUser=new this.userModel(user)
        return newUser.save()
    }

}
