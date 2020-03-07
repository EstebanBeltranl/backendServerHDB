import { Response } from 'express';
import Medico from '../../models/Medico';

export const crearMedico = async (req: any, res: Response) => {
    const { nombre, img, hospital } = req.body;
    
    const newMedico = new Medico({ 
        nombre, 
        img, 
        usuario: req.usuario.id, 
        hospital })

    await newMedico.save( (err, medicoGuardado) => {
        if(err) return res.status(400).json({
            ok: false,
            mensaje: 'Error al crear medico',
            errors: err
        })

        res.status(201).json({
            ok: true,
            medico: medicoGuardado,
        })
    })
}