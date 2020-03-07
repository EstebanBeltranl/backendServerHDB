import { model, Schema, Document } from 'mongoose';

interface IMedico extends Document {
    nombre: string;
    img: string;
    usuario: any;
    hospital: any
}

const Medico = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    img: { type: String, required: false },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    hospital: { type: Schema.Types.ObjectId, ref: 'Hospital', required: [true, 'El id	hospital es requerido'] },
})


export default model<IMedico>('Medico', Medico);