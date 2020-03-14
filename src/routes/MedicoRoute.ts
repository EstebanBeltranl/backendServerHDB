import { Router } from 'express';
import { getMedicos , crearMedico } from '../controllers/Medico';
import { AutenticarJWT } from '../middlewares/VerificarToken';
import { getUltimoRegistro } from '../middlewares/pagination';
const router: Router = Router();

router.get('/', getUltimoRegistro , getMedicos );
router.post('/', AutenticarJWT , crearMedico);


export default router;