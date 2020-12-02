import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './model/User';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly usermodel: Model<User>) { }

  async create(userDto: CreateUserDto): Promise<User> {
    const user = new this.usermodel(userDto);
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
  // async findByEmail(email: String): Promise<User> {
  //   const userFound = await this.usermodel.findOne({ where: { email } });
  //   console.log('FOUNFFFFF', userFound);
  //   return await userFound;
  // }

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
