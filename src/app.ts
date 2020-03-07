import express from 'express';
import morgan from "morgan";
import cors from "cors";

import UsuarioRoute from './routes/UsuarioRoute';
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
app.use('/usuario', UsuarioRoute)
app.use('/login', Login)


export default app;