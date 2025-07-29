import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidV4 } from 'uuid';
import { sendResetEmail } from './emailjs.helper';

@Injectable()
export class AuthService {


    resetTokens = new Map<string, string>()

    constructor(private userService: UserService, private jwtService: JwtService) { }

    async signup(name: string, email: string, password: string) {
        const hashedpassword = await bcrypt.hash(password, 10)
        return this.userService.createUser({ name, email, password: hashedpassword })
    }

    async login(email: string, password: string) {
        const user = await this.userService.findByEmail(email)
        if (!user) throw new UnauthorizedException('User not found')

        const matchpassword = await bcrypt.compare(password, user.password)
        if (!matchpassword) throw new UnauthorizedException('Invalid credentials')

        const payload = { sub: user._id, name: user.name }
        const token = this.jwtService.sign(payload)

        return { access_token: token }

    }

    async forgotpassword(email: string) {
        const user = await this.userService.findByEmail(email)
        console.log('User found:', user);
        if (!user) throw new NotFoundException('User not found')
        const reset_token = uuidV4()
        this.resetTokens.set(reset_token, email)
        const resetLink = `http://localhost:4200/reset-password?token=${reset_token}`
        try {
            await sendResetEmail(email, resetLink);
            console.log('Reset email sent successfully');
        } catch (error) {
            console.error('Error sending reset email:', error);
            throw error;
        }
        return { message: 'reset email sent' }
    }

    async resetPassword(token: string, newpassword: string) {
        const email = this.resetTokens.get(token)
        if (!email) throw new BadRequestException('Invalid reset token')

        const hashedpassword = await bcrypt.hash(newpassword, 10)
        const user = await this.userService.findByEmail(email)
        user.password = hashedpassword
        await user.save()

        this.resetTokens.delete(token)

        return { message: 'Password reset successful' }
    }
}
