import { Router } from 'express';
import { allBusqueda, buscarHospitales, buscarMedicos } from '../controllers/Allbusqueda';
import Hospital from '../models/Hospital';

const router: Router = Router();

// Busqueda total
router.get('/todo/:busqueda', allBusqueda)

// Busqueda por coleccion
router.get('/coleccion/:tabla/:busqueda', (req, res) => {
    const { busqueda , tabla} = req.params;
    let promesa;
    switch (tabla) {
        case 'hospital':
            promesa = buscarHospitales(busqueda)
            break;
        case 'medico': 
            promesa = buscarMedicos(busqueda)
            break;
        default:
            return res.status(400).json({ ok: false, mensaje: "Tipo de coleccion no valido, solo se acepta: 'hospital', 'medico'" })     
    }

    promesa.then( data => res.status(200).json({ ok: true, [tabla]: data }) )
})


export default router;