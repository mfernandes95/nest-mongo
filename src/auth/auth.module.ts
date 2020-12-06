import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { AuthService } from "./shared/auth.service";
import { LocalStrategy } from "./shared/local.strategy";
import {AuthController} from "./auth.controller"
import { JwtStrategy } from "./shared/jwt.strategy";
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import { jwtConstants } from "./shared/constants";

@Module({
  imports:[
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '60s' }
    }),
  ],
  controllers: [
    AuthController,
  ],
  providers:[
    AuthService,
    LocalStrategy,
    JwtStrategy
  ]
})
export class AuthModule{}