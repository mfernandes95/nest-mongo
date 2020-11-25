import { MongooseModule } from "@nestjs/mongoose";
import {Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as bcrypt from 'bcrypt';

export type PessoaDocument = Usuario & Document;

@Schema()
export class Usuario{
    @Prop({required: true})
    nome: String

    @Prop()
    idade: Number;

    @Prop({required: true})
    telefone: Number;

    @Prop({required: true})
    login: String;

    @Prop({required: true})
    senha: String;

}

export let UsuarioSchema;

UsuarioSchema.pre('save', async function (proximo) {
  let usuario_preenchido = this;

  bcrypt.hash(usuario_preenchido.senha, function (error, hash) {
    if (error) return proximo(error);

    usuario_preenchido.senha = hash;
    proximo();
  });
});

UsuarioSchema = SchemaFactory.createForClass(Usuario);