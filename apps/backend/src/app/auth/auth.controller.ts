import { Controller , Post, Body} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('login')
    async login(@Body() body:{email:string,password:string}){
        return this.authService.login(body.email,body.password)
    }

    @Post('signup')
    async signup(@Body() body:{name:string,email:string,password:string}){
        return this.authService.signup(body.name,body.email,body.password)
    }

    @Post('forgot-password')
    async forgotPassword(@Body() body:{email:string}){
        console.log('Received forgot-password request for email:', body.email);
        return this.authService.forgotpassword(body.email)
    }

    @Post('reset-password')
    resetpassword(@Body() body:{token:string,newpassword:string}){
        return this.authService.resetPassword(body.token,body.newpassword)
    }
}

