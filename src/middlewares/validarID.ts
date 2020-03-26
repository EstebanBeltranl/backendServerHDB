import { Response } from 'express';
import { Model } from 'mongoose';
import Usuario, { IUser } from '../models/Usuario';
import Medico, {IMedico} from '../models/Medico';
import Hospital, { IHosptital } from '../models/Hospital';

export const validarID = async (id: string, coleccion: any, res: Response) => {
    let Coleccion: Model<any> = Usuario;
    let nombreColeccion = ''
    switch (coleccion) {
        case 'usuarios':
            nombreColeccion = 'usuario';
            Coleccion = Usuario as Model<IUser>;
            break;
        case 'medicos':
            nombreColeccion = 'medico';
            Coleccion = Medico as Model<IMedico>;
            break;
        case 'hospitales':
            nombreColeccion = 'hospital';
            Coleccion = Hospital as Model<IHosptital>;
            break;
        default:
            break;
    }

    if( Coleccion ) {
        
        await Coleccion.findById({'_id': id}, (err: any, usuario: any) => {
            if(err) return res.status(500).json({ err, mesaje: 'Error interno db, Id no compatible' })
            if(!usuario) return res.status(400).json({mensaje: `El ${nombreColeccion} no existe`})
        })
    }
}