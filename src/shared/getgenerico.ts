import { Response } from 'express';
import Hospital  from '../models/Hospital';
import Medico from '../models/Medico';

type Modelos = 'Hospital' | 'Medico';

export const getGenericoConPaginacion = (modelo: Modelos) => {
    switch (modelo) {
        case 'Hospital':
            return findHospitales
        case 'Medico':
            return findMedico
        default:
            return findDefault
    }
}

const findHospitales = async (req: any, res: Response) => { 
    let { page } = req.query;
    let lastID = page || req.lastID;
    let currentPage = null;

    await Hospital.find( { _id: { '$gte': lastID } } )
        .sort({ _id: 1 })
        .limit(10)
        .populate('usuario', { 'password': 0, '__v': 0 })
        .exec(
            (err, hospitales) => {
                currentPage = lastID;
                lastID = hospitales[hospitales.length - 1]._id

                if(err) return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al cargar hospitales',
                    errors: err
                })

                res.status(200).json({
                    ok: true, 
                    data: hospitales,
                    proxPage: lastID,
                    currentPage,
                    limit: 10
                })
            }
        )
}

const findMedico = async (req: any, res: Response) => {

    let { page } = req.query;
    let lastID = page || req.lastID;
    let currentPage = null;

    return await Medico.find( { _id: { '$gte': lastID } } )
        .sort({ _id: 1 })
        .limit(10)
        .populate('usuario', { 'password': 0, '__v': 0 })
        .populate('hospital', { '__v': 0 })
        .exec(
            (err, medicos) => {

                currentPage = lastID;
                lastID = medicos[medicos.length - 1]._id

                if(err) return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al cargar medicos',
                    errors: err
                })

                res.status(200).json({
                    ok: true, 
                    data: medicos,
                    proxPage: lastID,
                    currentPage,
                    limit: 10
                })
            }
        )
}

const findDefault = (req: any, res: Response) => {
    return res.json({
        ok: false,
        mensaje: 'Error interno'
    })
} 