import { Request, Response } from 'express';
import Hospital from '../../models/Hospital';

export const updateHospital = async (req: any, res: Response) => {
    const { _id } = req.params;
    const { nombre } = req.body;

    await Hospital.findOneAndUpdate(
        { _id },
        { '$set': { 'nombre': nombre, 'usuario': req.usuario.id } },
        { new: true, fields: { '__v': 0 } },
        (err, hospitalActualizado) => {
             
            if( err ) return res.status(400).json({
                ok: false,
                mensaje: 'Error al actualizar hospital',
            })

            res.status(200).json({
                ok: true,
                mensaje: 'Hospital actualizado de forma exitosa!',
                hospital: hospitalActualizado
            });
        }
    )

}