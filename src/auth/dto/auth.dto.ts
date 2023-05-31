import { Exclude } from "class-transformer";
import { User } from "src/user/entities/user.entity";

export class JwtPayload {
    id: number;
  }

  export class SigninDto {
    id: number;
  
    username: string;
  
    email: string;
  
    access_token: string;
  
    @Exclude()
    password: string;
  
    constructor(partial: Partial<User>, token: string) {
      Object.assign(this, partial);
      this.access_token = token;
    }
  }