import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { AuthService } from "./shared/auth.service";
import { LocalStrategy } from "./shared/local.strategy";
import {AuthController} from "./auth.controller"

@Module({
  imports:[
    UserModule,
  ],
  controllers: [
    AuthController,
  ],
  providers:[
    AuthService,
    LocalStrategy
  ]
})
export class AuthModule{}