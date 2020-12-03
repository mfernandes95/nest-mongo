import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async validateUser(userEmail: String, userPassword: String) {
    const user = await this.userService.findByEmail(userEmail);
    if (user && user.password === userPassword) {
      const { _id, name, email } = user;
      return { id: _id, name, email };
    }
    return null;
  }
}
