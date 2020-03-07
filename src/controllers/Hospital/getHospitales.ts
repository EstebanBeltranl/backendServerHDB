import { Request, Response } from 'express';
import Hospital from '../../models/Hospital';

export const getHospitales = async (req: any, res: Response) => {
    
    await Hospital.find({})
        .populate('usuario', { 'password': 0, '__v': 0 })
        .exec(
            (err, hospitales) => {
                if(err) return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al cargar hospitales',
                    errors: err
                })

                res.status(200).json({
                    ok: true, 
                    hospitales
                })
            }
        )
}