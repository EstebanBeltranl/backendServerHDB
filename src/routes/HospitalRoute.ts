import { Router } from 'express';
import { crearHospital , getHospitales, updateHospital, deleteHospital } from '../controllers/Hospital';
import { AutenticarJWT } from '../middlewares/VerificarToken';
import { getUltimoRegistro } from '../middlewares/getUltimoRegistro';
const router: Router = Router();

router.get('/' , getUltimoRegistro ,getHospitales );
router.post('/', AutenticarJWT , crearHospital);
router.put('/:_id', AutenticarJWT , updateHospital);
router.delete('/:_id', AutenticarJWT , deleteHospital);

export default router;