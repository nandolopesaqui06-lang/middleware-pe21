import { type Request, type Response, Router } from "express";
// public router = new Router
const router = Router();
const METODO_PAGO = ['Efectivo', 'Transferencia', 'Debito', 'Credito']

//Post: estudianteId, materias (Arreglo), periodoId, metodo de pago - Registrar matricula
router.post('/', (req: Request, res: Response, next)  => {

    const {estudianteId, materias, periodoId, metodo_pago} = req.body;
    if(!estudianteId || !materias.length || !periodoId || !metodo_pago){
        console.error('No existe el id del estudiante')
    res.status(400).json(
        {
            error: 'Campos requeridos: estudianteId, materias, periodoId, metodo_pago'
        }
    )
}
    if(METODO_PAGO.includes(metodo_pago)){
        console.error('El metodo de pago insertado no es valido');
        res.status(400).json({
            error: 'El metodo de pago insertado debe ser: efectivo, debito, credito o transferencia'
        })
    }
    res.status(201).json({
        version: 'v2',
        message: {
            estudianteId, materias, periodoId, metodo_pago
        }
    })
})

export default router;