import { AuthService } from './shared/auth.service';
import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
