import 'dotenv/config';
import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import { requestLogger } from './middlewares/logger.js';
import { requireJwt } from './middlewares/auth.js';
import { rateLimiter } from './middlewares/rateLimiter.js';
import v1Inscripciones from './routes/v1/inscripciones.js';
import v2Inscripciones from './routes/v2/inscripciones.js';

const app = express();

app.use(express.json());      // 1. Parseo del cuerpo
app.use(requestLogger);       // 2. Logger
app.use(requireJwt);          // 3. Autenticación JWT
app.use(rateLimiter);         // 4. Límite de solicitudes

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', ts: new Date().toISOString() });
});
app.use('/v1/incripciones', v1Inscripciones);
app.use('/v2/incripciones', v2Inscripciones);

app.use((_err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(3000, () => console.log('Servidor en puerto 3000'));