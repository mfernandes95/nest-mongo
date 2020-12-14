import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './model/User';
import {ValidateSecurity} from '../assets/security'
import { exception } from 'console';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly usermodel: Model<User>) {}

  async create(userDto: CreateUserDto): Promise<User> {
    const user = new this.usermodel(userDto);
    const { password } = user;
    user.password = await ValidateSecurity.generateHash(password, 10);
    const emailExists = await this.checkEmail(user.email);
    const cpfExists = await this.checkCPF(user.cpf);
    if (!emailExists && !cpfExists) {
      return await user.save();
    }else{
      console.log("Maybe email or CPF alredy exists in another user.");
    }
  }

  async findAll(): Promise<Array<User>> {
    const listUsers = this.usermodel.find();
    return listUsers;
  }

  async findOne(cpfFilter: Number): Promise<User> {
    const userFound = this.usermodel.findOne({ cpf: cpfFilter });
    return await userFound;
  }

  async findByEmail(email: String): Promise<User> {
    return await this.usermodel.findOne({ email });
  }

  async update(cpfUserUpdate: number, userDto: UpdateUserDto) {
    const userFound = await this.usermodel.findOne({ cpf: cpfUserUpdate });
    const update = await this.usermodel.updateOne(
      { _id: userFound.id },
      userDto,
    );
    console.log('Teste_Update', userFound, update);
    return this.usermodel.findOne({ _id: userFound.id });
  }

  async remove(cpfUserRemove: number) {
    const userFound = await this.usermodel.findOne({ cpf: cpfUserRemove });
    return await this.usermodel.deleteOne({ _id: userFound.id });
  }

  private async checkEmail(email: String): Promise<Boolean> {
    let resultado = await this.findByEmail(email);
    if (resultado != null) {
      return true;
    } else {
      return false;
    }
  }
  private async checkCPF(CPF: Number): Promise<Boolean> {
    let resultado = await this.findOne(CPF);
    if (resultado != null) {
      return true;
    } else {
      return false;
    }
  }
}
