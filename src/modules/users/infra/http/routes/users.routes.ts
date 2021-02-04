import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UserAvatarController from '../controllers/UserAvatarController';
import UsersController from '../controllers/UsersController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const userAvatarController = new UserAvatarController();
const usersController = new UsersController();

const userRouter = Router();
const upload = multer(uploadConfig);

userRouter.post('/', usersController.create);

userRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'), // nome do campo que vai conter a imagem quando eu chamar essa rota.
  userAvatarController.create,
);
export default userRouter;
