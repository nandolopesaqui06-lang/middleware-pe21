import { Router, type Request, type Response } from 'express';

const router = Router();
const METODOS_PAGO = ['debit', 'credit', 'scholarship'] as const;

router.post('/', (req: Request, res: Response) => {
  const { estudianteId, materias, periodoId, payment_method, metodo_pago } = req.body;
  const metodoPago = payment_method ?? metodo_pago;

  if (!estudianteId || !Array.isArray(materias) || materias.length === 0 || !periodoId || !metodoPago) {
    res.status(400).json({
      error: 'Campos requeridos: estudianteId, materias, periodoId, payment_method'
    });
    return;
  }

  if (!METODOS_PAGO.includes(metodoPago as (typeof METODOS_PAGO)[number])) {
    res.status(400).json({
      error: 'payment_method invalido. Valores: debit, credit, scholarship'
    });
    return;
  }

  res.status(201).json({
    version: 'v2',
    message: {
      estudianteId,
      materias,
      periodoId,
      payment_method: metodoPago
    }
  });
});

export default router;