import { Request, Response } from 'express';
import Hospital from '../models/Hospital';
import Medico from '../models/Medico';


export const allBusqueda = async (req: Request, res: Response) => {
    const { busqueda } = req.params;

    Promise.all([
        buscarHospitales(busqueda),
        buscarMedicos(busqueda)
    ]).then( datos => {
            res.status(200).json({
            ok: true,
            hospitales: datos[0],
            medicos: datos[1]
            })
    })
}


export const buscarHospitales = (busqueda:string ) => {
    return new Promise((resolve, reject) => {
        Hospital.find( { '$text':{ '$search': busqueda } }  )
            .populate('usuario', 'nombre email')
            .exec(
                (err, hospitales) => {
                    if(err) reject('Error al cargar hospitales');
        
                    resolve(hospitales);
                }
            )
    }) 
}
export const buscarMedicos = (busqueda:string ) => {
    let regex = new RegExp(busqueda, 'i')
    return new Promise((resolve, reject) => {
        Medico.find( { 'nombre': { '$regex': regex } })
            .populate('usuario', 'nombre email')
            .populate('hospital', { '__v': 0 })
            .exec(
                (err, medicos) => {
                    if(err) reject('Error al cargar medicos');
        
                    resolve(medicos);
                } 
            )

    }) 
}