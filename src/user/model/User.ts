import { Document } from 'mongoose';

export class User extends Document {
    name: String;
    password: String;
    cpf: Number;
    email: String
    birthday: Date;
}