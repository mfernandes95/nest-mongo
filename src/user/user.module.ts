import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioSchema } from 'src/models/schemas/UsuarioSchema.schema';

@Module({
  imports:[MongooseModule.forFeature([{name: "User", schema: UsuarioSchema}])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
