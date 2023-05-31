import { BadRequestException, Body, Controller, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {

    }
}
