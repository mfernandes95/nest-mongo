import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LocalAuthGuard } from 'src/auth/shared/local-auth.guard';
import {JwtAuthGuard} from 'src/auth/shared/jwt-auth.guard'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':cpf')
  findOne(@Param('cpf') cpf: Number) {
    return this.userService.findOne(+cpf);
  }

  @UseGuards(JwtAuthGuard)
  @Get('email/:email')
  findByEmail(@Param('email') email: String) {
    console.log('emailllllllll', email);
    return this.userService.findByEmail(email);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':cpf')
  update(@Param('cpf') cpf: String, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+cpf, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':cpf')
  remove(@Param('cpf') cpf: String) {
    return this.userService.remove(+cpf);
  }
}
