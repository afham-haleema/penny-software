import { Body, Controller, Delete, Get, Param, Patch, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.schema";
import { AuthGuard } from "@nestjs/passport";

@Controller('users')
export class UserController{
    constructor(private userService:UserService){}

    @UseGuards(AuthGuard('jwt'))
    @Delete('me')
    async deleteUser(@Req() req){
        await this.userService.deleteUser(req.user.userId)
        return {message:'Deleted user successfully'}
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('me')
    async updateUser(@Req() req, @Body() updated:Partial<User>){
        const user=await this.userService.updateUser(req.user.userId,updated)
        return {message:'user updated successfully',user}
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    async getUser(@Req() req){
        const user=await this.userService.getUser(req.user.userId)
        return {name:user.name}
    }

} 