import { Request, Response } from 'express';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import MailProvider from '@shared/container/providers/MailProvider/implementations/EtheralMailProvider';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const userRepository = new UserRepository();
    const mailProvider = new MailProvider();
    const UserTokenRepository = new UserTokensRepository();
    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      userRepository,
      mailProvider,
      UserTokenRepository,
    );

    await sendForgotPasswordEmail.execute({ email });

    return response.status(204).json();
  }
}
