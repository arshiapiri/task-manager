import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>) {
    }
    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = new User();
        user.username = createUserDto.username;
        user.email = createUserDto.email;
        user.password = createUserDto.password;
        const createdUser = await this.userRepository.save(user);
        return createdUser;
      }

      async findUserByUsername(username: string): Promise<User> {
        return this.userRepository.findOneBy({ username });
      }

      async findUserByEmail(email: string): Promise<User> {
        return this.userRepository.findOneBy({ email });
      }

}
