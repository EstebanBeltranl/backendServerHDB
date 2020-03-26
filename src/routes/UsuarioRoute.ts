import { Router } from 'express';
import { crearUsuario, updateUsuario , deleteUsuario, getUsuarios} from '../controllers/Usuario';
import { AutenticarJWT } from '../middlewares/VerificarToken';
const router: Router = Router();

router.get('/', getUsuarios);
router.post('/', crearUsuario);
router.put('/:_id', AutenticarJWT , updateUsuario);
router.delete('/:_id', AutenticarJWT ,deleteUsuario);

export default router;
