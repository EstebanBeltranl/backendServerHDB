import { Request, Response } from 'express';
import Usuario from '../../models/Usuario';

export const getUsuarios = async (req: any, res: Response) => {
    await Usuario.find({}, {'password': 0, '__v': 0})
        .limit(5).exec(
            (err, usuarios) => {
                if(err) return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al cargar usuarios',
                    errors: err
                })
        
                res.status(200).json({
                    ok: true, 
                    usuarios
                })
            }
        )
}