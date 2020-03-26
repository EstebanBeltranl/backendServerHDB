import { model, Schema, Document } from 'mongoose';
import jwt from 'jsonwebtoken';
import config from '../config/config'
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import uniqueValidator from 'mongoose-unique-validator';


export interface IUser extends Document {
    nombre: string;
    email: string;
    password: string;
    img: string;
    role: string;
    google: boolean;
    generarJWT: () => string;
    comparePassword: (password: string) => boolean;

}

const rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol permitido'
};

const UsuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    email: { type: String, unique: true, required: [true, 'El correo es necesario'], lowercase: true },
    password: { type: String, required: [true, 'La contraseña es necesaria'] },
    img: { type: String, required: false },
    role: { type: String, required: true, default: 'USER_ROLE', enum: rolesValidos },
    google: { type: Boolean, default: false }
})

UsuarioSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único' } )

UsuarioSchema.pre<IUser>('save' , function (next) {
    const user = this;
    if( !user.isModified('password') ) return next();

    const stringParaCifrarPassword = genSaltSync(10);
    const hashPasswordCifrada =  hashSync(user.password, stringParaCifrarPassword);

    // Se cifra el password antes de ser guardado
    user.password = hashPasswordCifrada;
    next()
})

UsuarioSchema.methods.comparePassword = function (password: string): boolean {
    return compareSync(password, this.password);
}

UsuarioSchema.methods.generarJWT = function () {
    return jwt.sign( 
        {   
            id: this._id,
            email: this.email,
            role: this.role,
            img: this.img 
        }, 
        config.jwtSecret, 
        {expiresIn: '10h'} 
    );
}


export default model<IUser>('Usuario', UsuarioSchema);