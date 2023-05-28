import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateJwtToken(user: User): Promise<string> {
    const payload: JwtPayload = { id: user.id };
    return this.jwtService.signAsync(payload);
  }
}
