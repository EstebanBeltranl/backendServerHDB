import { Request, Response } from 'express';
import Usuario from '../../models/Usuario';

export const updateUsuario = async (req: Request, res: Response) => {
    const { _id } = req.params;
    const { nombre, email, role } = req.body;

    await Usuario.findOneAndUpdate(
        { _id },
        { '$set': { 'email': email, 'nombre': nombre, 'role': role } },
        {new: true, fields: '_id email nombre role'},
        (err, usuarioActualizado) => {
            
            if( err ) return res.status(400).json({
                ok: false,
                mensaje: 'Error al actualizar usuario',
            })

            res.status(200).json({
                ok: true,
                mensaje: 'Usuario actualizado de forma exitosa!',
                usuario: usuarioActualizado
            });
        }
    );
    

   
}