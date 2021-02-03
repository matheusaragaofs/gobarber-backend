
import { Request, Response } from 'express'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'
import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {

  public async create(request:Request, response:Response): Promise<Response> {

    const { name, email, password } = request.body;

    const usersRepository = new UsersRepository()

    const createUser = new CreateUserService(usersRepository);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json(userWithoutPassword);

}
}