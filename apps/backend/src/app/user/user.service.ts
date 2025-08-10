import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {User,userDocument} from './user.schema';
import * as bcrypt from 'bcrypt'


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


    async deleteUser(id:string):Promise<User>{
        console.log(await this.userModel.findById(id));
        return this.userModel.findByIdAndDelete(id)
    }

    async updateUser(id:string,updated:Partial<User>):Promise<User>{
        const updateData:any={}
        if(updated.name){
            updateData.name=updated.name
        }
        if(updated.password){
            updateData.password=await bcrypt.hash(updated.password, 10);
        }
        console.log(updateData)
        console.log(await this.userModel.findById(id));
        return this.userModel.findByIdAndUpdate(id,updateData,{new:true})
    }

    async getUser(id:string){
        return await this.userModel.findById(id)
    }

}
