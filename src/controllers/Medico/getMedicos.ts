import { Request, Response } from 'express';
import Medico from '../../models/Medico';

export const getMedicos = async (req: any, res: Response) => {

    await Medico.find({})
        .populate('usuario', { 'password': 0, '__v': 0 })
        .populate('hospital', { '__v': 0 })
        .exec(
            (err, medicos) => {
                if(err) return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al cargar medicos',
                    errors: err
                })

                
                res.status(200).json({
                    ok: true, 
                    medicos
                })
            }
        )

    
}

