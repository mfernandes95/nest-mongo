import {Injectable, UnauthorizedException} from '@nestjs/common';
import {Strategy} from 'passport-local';
import {PassportStrategy} from '@nestjs/passport';
import {AuthService} from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: String, password: String): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    console.log('Teste_Validação_usuário', user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}