import { Router } from 'express';
import { crearHospital , getHospitales, updateHospital, deleteHospital } from '../controllers/Hospital';
import { AutenticarJWT } from '../middlewares/VerificarToken';
const router: Router = Router();

router.get('/' , getHospitales );
router.post('/', AutenticarJWT , crearHospital);
router.put('/:_id', AutenticarJWT , updateHospital);
router.delete('/:_id', AutenticarJWT , deleteHospital);

export default router;