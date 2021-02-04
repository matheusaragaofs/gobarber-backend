import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import HashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const userRepository = new UserRepository();
    const hashProvider = new HashProvider();
    const authenticateUser = new AuthenticateUserService(
      userRepository,
      hashProvider,
    );
    // const authenticateUser = container.resolve(AuthenticateUserService);
    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
      avatar: user.avatar,
    };

    return response.json({ user: userWithoutPassword, token });
  }
}
