import { Response, NextFunction, Request } from "express";
import Hospital from '../models/Hospital';
import Medico from '../models/Medico';

export const getUltimoRegistro =  async (req: any, res: Response, next: NextFunction) => {
    let coleccion = req.baseUrl.slice(1)

    switch (coleccion) {
        case 'hospital':
            let lastIDHospital = await Hospital.find().sort({ _id: 1 }).limit(1)
            if(!lastIDHospital) res.json({
                ok: false,
                mensaje: 'Error al buscar ultimo ID'
            })
            
            req.lastID = lastIDHospital[0]._id;
            next()
            break;
        case 'medico':
            let lastIDMedico = await Medico.find().sort({ _id: 1 }).limit(1)
            if(!lastIDMedico) res.json({
                ok: false,
                mensaje: 'Error al buscar ultimo ID'
            })
            
            req.lastID = lastIDMedico[0]._id;
            next()
        break
    
        default:
            break;
    }
    
}