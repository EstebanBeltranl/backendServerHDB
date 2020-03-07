import express from 'express';
import morgan from "morgan";
import cors from "cors";

import UsuarioRoute from './routes/UsuarioRoute';
import HospitalRoute from './routes/HospitalRoute';
import MedicoRoute from './routes/MedicoRoute';
import Login from './routes/Login';

const app = express();

// Configuracion
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('tiny'));
app.use( cors() )
app.use( express.urlencoded({ extended: false }));
app.use(express.json());


// Routes
app.use('/login', Login)
app.use('/usuario', UsuarioRoute)
app.use('/hospital', HospitalRoute)
app.use('/medico', MedicoRoute )


export default app;