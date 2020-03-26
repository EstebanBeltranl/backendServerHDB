import express from 'express';
import morgan from "morgan";
import cors from "cors";


import UsuarioRoute from './routes/UsuarioRoute';
import HospitalRoute from './routes/HospitalRoute';
import MedicoRoute from './routes/MedicoRoute';
import Busqueda from './routes/Busqueda';
import Login from './routes/Login';
import Upload from './routes/Upload';

const app = express();

// Configuracion
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('tiny'));
app.use( cors({ exposedHeaders: 'Authorization' }) )
app.use( express.urlencoded({ extended: false }));
app.use(express.json());


// Routes
app.use('/login', Login)
app.use('/usuario', UsuarioRoute)
app.use('/hospital', HospitalRoute)
app.use('/medico', MedicoRoute )
app.use('/busqueda', Busqueda)
app.use('/upload', Upload)


export default app;