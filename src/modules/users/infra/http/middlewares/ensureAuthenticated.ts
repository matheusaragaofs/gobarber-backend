import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}
const { secret } = authConfig.jwt;
export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }
  // [bearer, dwoik242jk24424]
  // se eu colocar só uma virgula, ele identifica que eu nao usarei o primeiro item da lista
  const [, token] = authHeader.split(' ');
  try {
    const decoded = verify(token, secret);
    // decoded as TokenPayload estou forçando essa variável ser do tipo TokenPayload, para gerar auto-complete
    const { sub } = decoded as TokenPayload;
    request.user = {
      id: sub,
    };
    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
