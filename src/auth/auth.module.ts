import { Controller, UseGuards, Request, Post } from '@nestjs/common';
import { LocalAuthGuard } from './shared/local-auth.guard';


@Controller()
export class AuthModule {
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any){
    return req.user;
  }
}
