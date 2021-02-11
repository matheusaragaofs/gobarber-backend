import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;
    const user_id = request.user.id;
    const parsedDate = parseISO(date);
    try {
      const createAppointment = container.resolve(CreateAppointmentService);

      const appointment = await createAppointment.execute({
        date: parsedDate,
        provider_id,
        user_id,
      });

      return response.json(appointment);
    } catch (err) {
      console.log(provider_id);
      console.log(date);

      return response.json({ Err: err });
    }
  }
}
