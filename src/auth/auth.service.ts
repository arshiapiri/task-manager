import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { User } from 'src/user/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly mailerService: MailerService
    ) {}

  async generateJwtToken(user: User): Promise<string> {
    const payload: JwtPayload = { id: user.id };
    return this.jwtService.signAsync(payload);
  }

  async sendVerificationEmail(email: string, verificationCode: string) {
    const mailOptions = {
      to: email,
      subject: 'Verification Code',
      text: `Your verification code is: ${verificationCode}`,
    };

    await this.mailerService.sendMail(mailOptions);
  }
  
  generateVerificationCode(): string {
    const verificationCode = uuidv4().substr(0, 6);
    return verificationCode;
  }
}
