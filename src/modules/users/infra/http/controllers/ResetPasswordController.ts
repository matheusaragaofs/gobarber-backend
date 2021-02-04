import { Request, Response } from 'express';
// import { container } from 'tsyringe';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import HashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;
    const userRepository = new UserRepository();
    const hashProvider = new HashProvider();
    const userTokensRepository = new UserTokensRepository();
    // const resetPassword = container.resolve(ResetPasswordService);
    const resetPassword = new ResetPasswordService(
      userRepository,
      userTokensRepository,
      hashProvider,
    );

    await resetPassword.execute({ password, token });

    return response.status(204).json();
  }
}
