import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import { errors } from 'celebrate';
import routes from './routes';
import rateLimiter from './middlewares/RateLimiter.';
import '@shared/infra/typeorm';
import '@shared/container';

const app = express();
app.use(rateLimiter);
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadFolder));
app.use(routes);
app.use(errors());

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    // Se o erro for uma instância do meu AppError
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  return (
    response
      // Se o erro for desconhecido
      .status(500)
      .json({ status: 'error', message: 'Internal server error' })
  );
});

app.get('/', (req, res) => {
  res.send('<n1>Bem vindo amigo!</h1>');
});

app.listen(3333, () => {
  console.log('Server is running at 3333 😉👌');
});
