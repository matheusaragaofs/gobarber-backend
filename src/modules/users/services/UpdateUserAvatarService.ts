import { injectable, inject } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import User from '../infra/typeorm/entities/User';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  user_id: string;
  avatarFileName: string;
}
@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UserRepositoryID')
    private usersRepository: IUsersRepository,
    @inject('StorageProviderID')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('Only authenticaded users can change avatar', 401);
    }
    if (user.avatar) {
      // se já tinha um usuário antes, deleta esse anterior
      await this.storageProvider.deleteFile(user.avatar);
    }
    const filename = await this.storageProvider.saveFile(avatarFileName);

    user.avatar = filename;
    await this.usersRepository.save(user);
    return user;
  }
}
