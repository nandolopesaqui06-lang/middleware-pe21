import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Limpiamos las comillas extras que puedan venir del archivo .env
const JWT_SECRET = (process.env.JWT_SECRET ?? '').replace(/['"]/g, '');
const JWT_ALGORITHM = 'HS256';

interface CustomJwtPayload extends jwt.JwtPayload {
  sub?: string;
  scope?: string;
}

export function requireJwt(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization'] ?? '';
  const token = typeof authHeader === 'string' && authHeader.startsWith('Bearer ')
    ? authHeader.slice(7).trim()
    : '';

  if (!token) {
    res.status(401).json({ error: 'Token malformado o ausente' });
    return;
  }

  if (!JWT_SECRET) {
    console.error('JWT_SECRET no configurado en las variables de entorno');
    res.status(500).json({ error: 'Configuración de seguridad inválida' });
    return;
  }

  try {
    // jwt.verify se encarga de revisar la firma, el algoritmo y si está expirado todo en un solo paso
    const decoded = jwt.verify(token, JWT_SECRET, { algorithms: [JWT_ALGORITHM] }) as CustomJwtPayload;

    // Inyectamos el usuario en la petición
    (req as Request & { user?: { sub: string; scope: string } }).user = {
      sub: decoded.sub ?? 'anonymous', // Evita que falle si Postman no envía "sub"
      scope: decoded.scope ?? ''
    };

    next();
  } catch (error: any) {
    // Personalizamos el error según lo que haya fallado
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({ error: 'Token expirado' });
    } else if (error.name === 'JsonWebTokenError') {
      res.status(401).json({ error: 'Firma inválida o token corrupto' });
    } else {
      res.status(401).json({ error: 'Token inválido' });
    }
  }
}

export function requireApiKey(req: Request, res: Response, next: NextFunction): void {
  const key = req.headers['x-api-key'];

  if (key !== 'secreto-demo') {
    res.status(401).json({ error: 'API key inválida o ausente' });
    return;
  }

  next();
}