import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './model/User';
import {ValidateSecurity} from '../assets/security'

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly usermodel: Model<User>) { }

  async create(userDto: CreateUserDto): Promise<User> {
    const user = new this.usermodel(userDto);
    const {password} = user;
    user.password = await ValidateSecurity.generateHash(password, 10) ;
    console.log('Teste_Post', user);
    return await user.save();
  }

  async findAll(): Promise<Array<User>> {
    const listUsers = this.usermodel.find();
    return listUsers;
  }

  async findOne(cpfFilter: number): Promise<User> {
    const userFound = this.usermodel.findOne({ cpf: cpfFilter });
    return await userFound;
  }

  async findByEmail(email: String): Promise<User> {
    return await this.usermodel.findOne({ email })
  }

  async update(cpfUserUpdate: number, userDto: UpdateUserDto) {
    const userFound = await this.usermodel.findOne({ cpf: cpfUserUpdate });
    const update = await this.usermodel.updateOne({ _id: userFound.id }, userDto)
    console.log('Teste_Update', userFound, update);
    return this.usermodel.findOne({ _id: userFound.id })
  }

  async remove(cpfUserRemove: number) {
    const userFound = await this.usermodel.findOne({ cpf: cpfUserRemove })
    return await this.usermodel.deleteOne({ _id: userFound.id })
  }
}
