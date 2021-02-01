import { startOfHour } from 'date-fns';

import AppError from '@shared/errors/AppError';

import { injectable, inject} from 'tsyringe'

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface Request {
  provider_id: string;
  date: Date;
}

@injectable()
class ClassAppointmentService {
  constructor (
  @inject('AppointmentsRepositoryID')
  private appointmentRepository: IAppointmentsRepository) {


    //se eu colocar o private na frente, ele cria automaticamente a variável
  }

  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(
      appointmentDate,
    );


    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default ClassAppointmentService;
