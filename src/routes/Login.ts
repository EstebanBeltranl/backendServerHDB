import { Request, Response, Router } from 'express';
import config from '../config/config'
import Usuario from '../models/Usuario';
import { OAuth2Client } from 'google-auth-library';

const router: Router = Router();

// AUTENTICACION CON GOOGLE
const client = new OAuth2Client(config.GOOGLE.CLIENT_ID)

async function verify(token: any) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: config.GOOGLE.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if(payload) {

        return {
            nombre: payload.name,
            email: payload.email,
            img: payload.picture,
            google: true
        }

    }
}

router.post('/google', async (req, res) => {
    const { token } = req.body;
    const googleUser = await verify(token)
        .catch( e => {
            res.status(401).json({
                ok: false,
                mensaje: 'Token de google no valido',
                
            })
    });
    
    if(googleUser) {
        Usuario.findOne({ email: googleUser.email }, { 'password': 0, '__v': 0 } , async (err, usuario) => {
            if(err) return res.status(500).json({
                ok: true,
                mensaje: 'Error al buscar usuario!!!!',
            })

            // Si el usuario existe, ver si se creo por registro normal
            // o se registro con google sign
            if(usuario) {
                if( !usuario.google ) {
                    res.status(400).json({
                        ok: false,
                        mensaje: 'Debe usar su autenticacion normal',
                    })
                } else {
                    const JSONWEBTOKEN = usuario.generarJWT()
                    res.status(200)
                        .header('Authorization', JSONWEBTOKEN)
                        .json({
                            ok: true,
                            usuario,
                            id: usuario._id
                        })
                }
            } else {
                // El usuario no existe, hay que crearlo
                if(googleUser) {
                    const {email, nombre , img} = googleUser;
                    const newUser = new Usuario({ 
                        nombre, 
                        email, 
                        img,
                        password: ':)', 
                        google: true
                    })

                    await newUser.save( (err, usuario) => {
                        if(err) return res.status(500).json( { ok: false, errores: err })

                        const JSONWEBTOKEN = usuario.generarJWT()
                        res.status(200)
                            .header( 'Authorization', JSONWEBTOKEN)
                            .json({
                                ok: true,
                                usuario,
                                id: usuario._id
                            })
                    })
                }
            }
        })    
    }   
})



// AUTENTICACION NORMAL
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
                return res.status(400).json({ mensaje: 'Usuario no existe!'})
            }

            const mismoPassword = usuario.comparePassword(password);
            if( !mismoPassword ) {
                return res.status(400).json({ mensaje: 'Correo y/o password son incorrectos'})
            }

            const JSONWEBTOKEN = usuario.generarJWT()
         
            res.status(200)
                    .header( 'Authorization', JSONWEBTOKEN )
                    .send({ ok: true, usuario: {email: usuario.email, _id: usuario.id}, id: usuario._id })
        }
    )
});


export default router;
