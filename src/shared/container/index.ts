import { container } from 'tsyringe'

import '@modules/users/providers/index' //pra poder ser cadastrado

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

container.registerSingleton<IAppointmentsRepository>('AppointmentsRepositoryID',AppointmentsRepository)
container.registerSingleton<IUsersRepository>('UserRepositoryID',UsersRepository)
