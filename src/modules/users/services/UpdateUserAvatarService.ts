import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../entities/User';
import uploadConfig from '../../../config/upload';
import AppError from '../../../shared/errors/AppError';

interface Request {
  user_id: string;
  avatarFileName: string;
}
export default class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(user_id);
    if (!user) {
      throw new AppError('Only authenticaded users can change avatar', 401);
    }
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      // fs.promises garante que vai estar utilizando as funções do filesystem em formato de promises
      // stat() retorna o status de um arquivo se ele existir
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFileName;
    await userRepository.save(user);
    return user;
  }
}
