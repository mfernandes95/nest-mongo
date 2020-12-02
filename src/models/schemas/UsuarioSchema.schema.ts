import { MongooseModule } from "@nestjs/mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type PessoaDocument = Usuario & Document;

@Schema()
export class Usuario {
    @Prop({ required: true })
    name: String

    @Prop({ required: true })
    password: String;

    @Prop({ required: true })
    cpf: number;

    @Prop({ required: true })
    email: String;

    @Prop()
    birthday: Date;


}



// UsuarioSchema.pre('save', async function (proximo) {
//   let usuario_preenchido = this;

//   bcrypt.hash(usuario_preenchido.senha, function (error, hash) {
//     if (error) return proximo(error);

//     usuario_preenchido.senha = hash;
//     proximo();
//   });
// });

export let UsuarioSchema = SchemaFactory.createForClass(Usuario);