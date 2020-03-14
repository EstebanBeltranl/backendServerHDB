import { model, Schema, Document } from 'mongoose';

export interface IHosptital extends Document {
    nombre: string;
    img: string;
    usuario: any;
}

const HospitalSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    img: { type: String, required: false },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
}, { collection: 'hospitales' })


export default model<IHosptital>('Hospital', HospitalSchema);