import { Router, type Request, type Response } from 'express';

const router = Router();

router.post('/', (req: Request, res: Response) => {
  const { estudianteId, materias, periodoId } = req.body;

  if (!estudianteId || !Array.isArray(materias) || materias.length === 0 || !periodoId) {
    res.status(400).json({
      error: 'Campos requeridos: estudianteId, materias, periodoId'
    });
    return;
  }

  res.status(201).json({
    version: 'v1',
    message: {
      estudianteId,
      materias,
      periodoId
    }
  });
});

export default router;