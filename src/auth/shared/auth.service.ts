import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import {JwtService} from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userEmail: String, userPassword: String) {
    const user = await this.userService.findByEmail(userEmail);
    if (user && user.password === userPassword) {
      const { _id, name, email } = user;
      return { id: _id, name, email };
    }
    return null;
  }

  async login(user:any){
    const payload = {email: user.email, sub: user._id};
    return{
      access_token: this.jwtService.sign(payload)
    };
  }
}
