import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes';
import cors from 'cors';
import uploadConfig from '../../../config/upload';
import AppError from '../../errors/AppError';
import '../typeorm';

const app = express();
app.use(cors())
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _:NextFunction) => {
  if (err instanceof AppError) {
    // Se o erro for uma instância do meu AppError
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.log(err);
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
