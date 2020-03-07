import { Request, Response, Router } from 'express';
import Usuario from '../models/Usuario';
const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    await Usuario.findOne(
        { email }, 
        {'__v': 0},
        (err, usuario)=> {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar usuario',
                    errors: err
                });
            }
            if( !usuario ){
                return res.status(400).send('Usuario no existe!')
            }

            const mismoPassword = usuario.comparePassword(password);
            if( !mismoPassword ) {
                return res.status(400).send( 'Correo y/o password son incorrectos' )
            }

            const JSONWEBTOKEN = usuario.generarJWT()

            res.status(200)
                    .header( 'Authorization', JSONWEBTOKEN)
                    .send({ usuario: {email: usuario.email, _id: usuario.id, token: JSONWEBTOKEN} })
        }
    )
});


export default router;
