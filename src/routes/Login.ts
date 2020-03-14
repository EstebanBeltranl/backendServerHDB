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
            res.status(200).json({
                ok: false,
                mensaje: 'TOKEN DE GOOGLE NO VALIDO!!!!',
                error: e
            })
    });
    
    if(googleUser) {
        Usuario.findOne({ email: googleUser.email }, async (err, usuarioDB) => {
            if(err) return res.status(500).json({
                ok: true,
                mensaje: 'Error al buscar usuario!!!!',
            })

            // Si el usuario existe, ver si se creo por registro normal
            // o se registro con google sign
            if(usuarioDB) {
                if( !usuarioDB.google ) {
                    res.status(400).json({
                        ok: false,
                        mensaje: 'Debe usar su autenticacion normal',
                    })
                } else {
                    const JSONWEBTOKEN = usuarioDB.generarJWT()
                    res.status(200)
                        .header( 'Authorization', JSONWEBTOKEN)
                        .json({
                            ok: true,
                            usuarioDB,
                            token: JSONWEBTOKEN,
                            id: usuarioDB._id
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

                    await newUser.save( (err, usuarioDB) => {
                        if(err) return res.status(500).json( { ok: false, errores: err })

                        const JSONWEBTOKEN = usuarioDB.generarJWT()
                        res.status(200)
                            .header( 'Authorization', JSONWEBTOKEN)
                            .json({
                                ok: true,
                                usuarioDB,
                                token: JSONWEBTOKEN,
                                id: usuarioDB._id
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
