import { Router, type Request, type Response } from 'express';

const router = Router();

//Post: estudianteId, materias (Arreglo), periodoId
router.post("/", (req: Request, res: Response)=>{
    const {estudianteId, materias, periodoId} = req.body;

    if(!estudianteId || !materias.length || !periodoId) {
        console.error("No existe el id del estudiante")
        res.status(400).json(
            {
            error: "Campos requeridos: estudianteId, materias; periodoId"
            }
        )
    }
    res.status(201).json({
        varsion: "v1",
        message:{
            estudianteId, materias, periodoId
        }
    })

})
export default router;