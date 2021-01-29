import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../entities/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../../../shared/errors/AppError';

interface Request {
  provider_id: string;
  date: Date;
}

class ClassAppointmentService {
  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );
    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked!');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });
    await appointmentsRepository.save(appointment);
    return appointment;
  }
}

export default ClassAppointmentService;
