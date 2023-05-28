import { BadRequestException, Body, Controller, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {

    }
    @Post("signup")
    async createUser(@Body() body: CreateUserDto) {
        if (!!(await this.userService.findUserByEmail(body.email))) {
            throw new BadRequestException('Try another email.');
        }
        if (!!(await this.userService.findUserByUsername(body.username))) {
            throw new BadRequestException('Try another UserName.');
        }
        await this.userService.create(body);
    }
}
