import 'reflect-metadata';
import AppError from '@shared/errors/AppError'
import CreateUserService from './CreateUserService'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'


  describe('CreateUser',()=>{
    it('should be able to create a new user',async ()=>{

      const fakeUsersRepository = new FakeUsersRepository()
      const createUserService = new CreateUserService(fakeUsersRepository)

      const appointment = await createUserService.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password:'40028922'

      })
      expect(appointment).toHaveProperty('id')
    })

    it('should not be able to create a new user with an email that already exists',async ()=>{

      const fakeUsersRepository = new FakeUsersRepository()
      const createUserService = new CreateUserService(fakeUsersRepository)

       await createUserService.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password:'40028922'

      })

      expect( createUserService.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password:'40028922'

      })).rejects.toBeInstanceOf(AppError)

    })



  })
