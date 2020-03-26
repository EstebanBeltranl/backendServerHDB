import { Request, Response } from 'express';
import Hospital from '../models/Hospital';
import Medico from '../models/Medico';
import Usuario from '../models/Usuario';


export const allBusqueda = async (req: Request, res: Response) => {
    const { busqueda } = req.params;

    Promise.all([
        buscarHospitales(busqueda),
        buscarMedicos(busqueda),
        buscarUsuarioPorEmail(busqueda)
    ]).then( datos => {
            res.status(200).json({
            ok: true,
            hospitales: datos[0],
            medicos: datos[1],
            usuarios: datos[2]
            })
    })
}


export const buscarHospitales = (busqueda:string ) => {
    return new Promise((resolve, reject) => {
        Hospital.find( { '$text':{ '$search': busqueda } }, { '__v': 0 }  )
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
        Medico.find( { 'nombre': { '$regex': regex } }, {'__v': 0})
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

export const buscarUsuarioPorEmail = (busqueda:string ) => {
    
    return new Promise((resolve, reject) => {

        if(!busqueda) reject('Ingrese una busquyeda')

        Usuario.find( { 'email': busqueda }, { 'password': 0, '__v': 0 })
            .exec(
                (err, usuarios) => {
                    if(err) reject('Error al cargar usuarios');
        
                    resolve(usuarios);
                } 
            )

    }) 
}