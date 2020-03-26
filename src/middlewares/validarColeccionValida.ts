import { Request, Response, NextFunction } from 'express';
import { validarID } from './validarID';

export const validarColeccionValida = async (req: Request, res: Response, next: NextFunction) => {
    const { coleccion, id } = req.params;

    let coleccionesValidas = ['hospitales', 'medicos', 'usuarios'];
    if(  !coleccionesValidas.includes( coleccion ) ) {
        res.status(401).json({ ok: false, mensaje: `Coleccion no valida. Colecciones Validas son: ${coleccionesValidas.join(' | ')}`})
    }

    await validarID(id, coleccion, res)
    
    next()
}