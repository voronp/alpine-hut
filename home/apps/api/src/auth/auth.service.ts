import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import {User} from '../users/user.entity'
import bcryptjs from 'bcryptjs'
import {environment} from '../environments/environment'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  generatePasswordHash(pass:string, salt: string):string {
    return bcryptjs.hashSync(pass+environment.passwordStaticHash, salt)
  }

  async validateUser(username: string, pass: string): Promise<User | null> {
    let user = await this.usersService.findByLogin(username);
    if(!user)
      user = await this.usersService.findByEmail(username)
    if (user && user.Password === this.generatePasswordHash(pass, user.Salt)) {
      return user
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.Login, sub: user.ID };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
