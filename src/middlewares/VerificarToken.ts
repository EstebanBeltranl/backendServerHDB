import jwt , { VerifyErrors } from "jsonwebtoken";
import { Response, NextFunction, Request } from "express";
import config from '../config/config';

export const AutenticarJWT = (req: any, res: Response, next: NextFunction) => {
    let jwtoken = req.header('Authorization');
    jwtoken = jwtoken?.split(' ')[1];

    if( !jwtoken ) return res.status(401).send('Acceso denegado, Sin Token');

    jwt.verify( jwtoken, config.jwtSecret , (err: VerifyErrors, decoded: any) => {
        if(err) return res.status(401).send('Acceso denegado. Token no valido')
        req.usuario = decoded
        next()
    } )
    
}