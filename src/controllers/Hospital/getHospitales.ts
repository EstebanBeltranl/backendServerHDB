import { Request, Response } from 'express';
import Hospital from '../../models/Hospital';
import { getGenericoConPaginacion } from '../../shared/getgenerico';


export const getHospitales = getGenericoConPaginacion('Hospital');
