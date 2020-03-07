import { Router } from 'express';
import { getMedicos , crearMedico } from '../controllers/Medico';
import { AutenticarJWT } from '../middlewares/VerificarToken';
const router: Router = Router();

router.get('/' , getMedicos );
router.post('/', AutenticarJWT , crearMedico);


export default router;