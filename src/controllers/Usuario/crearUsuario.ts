import { Request, Response } from 'express';
import Usuario from '../../models/Usuario';


export const crearUsuario = async (req: any, res: Response) => {
    const { nombre, email, password, img, role } = req.body;

    const newUsuario = new Usuario({ nombre, email, password, img, role })
    await newUsuario.save( (err, usuarioGuardado) => {
        if(err) return res.status(400).json({
            ok: false,
            mensaje: 'Error al crear usuario',
            errors: err
        })

        res.status(201).json({
            ok: true,
            usuario: { nombre, email, img, role: usuarioGuardado.role, _id: usuarioGuardado._id  },
            usuarioToken: req.usuario
        })
    })
}