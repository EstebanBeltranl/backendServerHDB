import { Request, Response } from 'express';
import Usuario from '../../models/Usuario';

export const deleteUsuario = async (req: Request, res: Response) => {
    const { _id } = req.params;

    await Usuario.findOneAndDelete(
        { _id },
        { projection: { 'password': 0, '__v': 0 } },
        (err, usuarioBorrado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error borrar usuario',
                    errors: err
                });
            }

            if (!usuarioBorrado) {
                return res.status(400).json({
                    ok: false,
                    errors: { message: 'No existe un usuario con ese id' }
                });
            }
    
            res.status(200).json({
                ok: true,
                usuario: usuarioBorrado
            });
        }
    )
}