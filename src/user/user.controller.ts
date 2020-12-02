import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  @Get(':cpf')
  findOne(@Param('cpf') cpf: Number) {
    return this.userService.findOne(+cpf);
  }

  @Get('email/:email')
  findByEmail(@Param('email') email: String) {
    console.log('emailllllllll', email);
    return this.userService.findByEmail(email);
  }

  @Put(':cpf')
  update(@Param('cpf') cpf: String, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+cpf, updateUserDto);
  }

  @Delete(':cpf')
  remove(@Param('cpf') cpf: String) {
    return this.userService.remove(+cpf);
  }
}
