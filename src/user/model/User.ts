import {Document} from 'mongoose';

export class User extends Document{
    name: String;
    password: String;
    cpf: Number;
    birthday: Date;
}