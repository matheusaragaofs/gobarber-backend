import { isEqual } from 'date-fns'
import { v4 as uuid} from 'uuid'
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/IcreateAppointmentDTO'

import Appointment from '../../infra/typeorm/entities/Appointment';

// DATA TRANSFER OBJECT
class AppointmentsRepository implements IAppointmentsRepository {

  private appointments: Appointment[] = []

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment=> isEqual(appointment.date,date))

    if (!findAppointment){
      return undefined
    }
    else{
      return findAppointment
    }



  }
  public async create({ provider_id,date}:ICreateAppointmentDTO):Promise<Appointment>{
    const appointment = new Appointment()

      Object.assign(appointment, {id: uuid(), date, provider_id})

      this.appointments.push(appointment)

      return appointment


  }
}

export default AppointmentsRepository;
