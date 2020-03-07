import { Request, Response } from 'express';
import Hospital from '../../models/Hospital';

export const deleteHospital = async (req: Request, res: Response) => {
    const { _id } = req.params;
    await Hospital.findOneAndDelete(
        {_id},
        (err, hospitalBorrado) => {
            if (err) return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar hospital',
                errors: err
            });

            if (!hospitalBorrado) return res.status(400).json({
                ok: false,
                errors: { message: 'No existe un hospital con ese id' }
            });
    
            res.status(200).json({
                ok: true,
                mensaje: 'Hospital borrado exitosamente',
                hospital: hospitalBorrado
            });
        }
    )
}