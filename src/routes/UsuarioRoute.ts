import { Router } from 'express';
import { crearUsuario, updateUsuario , deleteUsuario} from '../controllers/Usuario';
import { AutenticarJWT } from '../middlewares/VerificarToken';
const router: Router = Router();

router.post('/', AutenticarJWT , crearUsuario);
router.put('/:_id', updateUsuario);
router.delete('/:_id', deleteUsuario);

export default router;
