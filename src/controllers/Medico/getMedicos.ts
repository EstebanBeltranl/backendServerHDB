import { Request, Response } from 'express';
import Medico from '../../models/Medico';
import { getGenericoConPaginacion } from '../../shared/getgenerico';


export const getMedicos = getGenericoConPaginacion('Medico');

