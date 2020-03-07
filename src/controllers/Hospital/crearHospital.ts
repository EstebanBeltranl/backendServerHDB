import { Request, Response } from 'express';
import Hospital from '../../models/Hospital';

export const crearHospital = async (req: any, res: Response) => {
    const { nombre, img } = req.body;
    
    const newHospital = new Hospital({ nombre, img, usuario: req.usuario.id })
    await newHospital.save( (err, hospitalGuardado) => {
        if(err) return res.status(400).json({
            ok: false,
            mensaje: 'Error al crear hospital',
            errors: err
        })

        res.status(201).json({
            ok: true,
            hospital: hospitalGuardado,
        })
    })
}