import { BadRequestException, Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create.user.dto';
import { SigninDto } from './dto/auth.dto';
import { User } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) { }

    @Post('signup')
    async createUser(@Body() body: CreateUserDto) {
        if (!!(await this.userService.findUserByEmail(body.email))) {
            throw new BadRequestException('Try another email.');
        }
        if (!!(await this.userService.findUserByUsername(body.username))) {
            throw new BadRequestException('Try another UserName.');
        }

        const user: User = await this.userService.create(body);

        // create code 
        const verificationCode = this.authService.generateVerificationCode();

        // send email 
        await this.authService.sendVerificationEmail(user.email, verificationCode);

        const accessToken: string = await this.authService.generateJwtToken(user);
        return new SigninDto(user, accessToken);
    }
}