import { Request, Response } from 'express';
import { upload } from '../middlewares';
import fs, { PathLike } from 'fs';

import Usuario from '../models/Usuario';
import Medico from '../models/Medico';
import Hospital from '../models/Hospital';

type Colecciones = 'medicos' | 'hospitales' | 'usuarios';

export const UploadFoto = (req: Request, res: Response) => {
    
    upload(req, res, async function (err) {
        const { id } = req.params;
        let coleccion: Colecciones = req.params.coleccion as Colecciones;

        if (err) {
            return res.status(500).json( {ok: false, errors: { mensaje: err.message }} )
        } else {
            if( !req.file ) {
                return res.status(500).json( {
                    ok: false,
                    mensaje: 'No selecciono nada',
                    errors: { mensaje: 'Debe seleccionar una imagen' }
                })
            }

            await actualizarFotoEnBaseDeDatos( coleccion, id, req.file.path, res )
        }

    })
}



const actualizarFotoEnBaseDeDatos = async ( coleccion: Colecciones, _id: string , pathImagen: string, res: Response ) => {

    switch (coleccion) {
        case 'usuarios':
            actualizarFotoUsuario(_id, pathImagen, res);
            break;
    
        case 'medicos':
            actualizarFotoMedico(_id, pathImagen, res);
            break;

        case 'hospitales':
            actualizarFotoHospital(_id, pathImagen, res);
            break;
    
        default:
            break;
    }
}


const actualizarFotoUsuario = async (_id: string , pathImagen: string, res: Response) => {
    
    return await Usuario.findOneAndUpdate( 
            { '_id': _id }, 
            { '$set': { 'img': pathImagen } },
            { fields: { 'password': 0, '__v': 0 } }
        ).exec(
            (err, usuarioActualizado) => {
                if(err) return res.status(401).json(
                    { ok: false, mensaje: 'Error al actualizar usuario' , err}
                )
                
                let pathViejo: PathLike = usuarioActualizado?.img as PathLike;
                if( fs.existsSync(pathViejo) ) {
                    fs.unlink( pathViejo, (err) => {
                        if (err) throw err;
                        console.log('path/file.txt was deleted');
                    });
                }

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Usuario actualizado correctamente',
                    usuarioActualizado: {
                        nombre: usuarioActualizado?.nombre,
                        _id: usuarioActualizado?._id,
                        role: usuarioActualizado?.role,
                        google: usuarioActualizado?.google,
                        email: usuarioActualizado?.email,
                        img: pathImagen
                    }
                })
            }
        )
}

const actualizarFotoMedico = async (_id: string , pathImagen: string, res: Response) => {
    
    return await Medico.findOneAndUpdate( 
            { '_id': _id }, 
            { '$set': { 'img': pathImagen } },
            { fields: { '__v': 0 } }
        ).exec(
            (err, medicoActualizado) => {
                if(err) return res.status(401).json(
                    { ok: false, mensaje: 'Error al actualizar medico' , err}
                )
                
                let pathViejo: PathLike = medicoActualizado?.img as PathLike;
                if( fs.existsSync(pathViejo) ) {
                    fs.unlink( pathViejo, (err) => {
                        if (err) throw err;
                        console.log('Foto antigua borrada!');
                    });
                }

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Medico actualizado correctamente',
                    medicoActualizado: {
                        nombre: medicoActualizado?.nombre,
                        _id: medicoActualizado?._id,
                        img: pathImagen,
                        usuario: medicoActualizado?.usuario,
                        hospital: medicoActualizado?.hospital
                    }
                })
            }
        )
}

const actualizarFotoHospital = async (_id: string , pathImagen: string, res: Response) => {
    
    return await Hospital.findOneAndUpdate( 
            { '_id': _id }, 
            { '$set': { 'img': pathImagen } },
            { fields: { '__v': 0 } }
        ).exec(
            (err, hospitalActualizado) => {
                if(err) return res.status(401).json(
                    { ok: false, mensaje: 'Error al actualizar hospital' , err}
                )
                
                let pathViejo: PathLike = hospitalActualizado?.img as PathLike;
                if( fs.existsSync(pathViejo) ) {
                    fs.unlink( pathViejo, (err) => {
                        if (err) throw err;
                        console.log('Foto antigua borrada!');
                    });
                }

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Hospital actualizado correctamente',
                    hospitalActualizado: {
                        nombre: hospitalActualizado?.nombre,
                        _id: hospitalActualizado?._id,
                        img: pathImagen,
                        usuario: hospitalActualizado?.usuario,
                    }
                })
            }
        )
}