import { Router, Request, Response, NextFunction } from 'express';
import { UploadFoto } from '../controllers/UploadFoto';
import { validarColeccionValida } from '../middlewares';


const router: Router = Router();

router.put('/:coleccion/:id', validarColeccionValida , UploadFoto);


export default router;