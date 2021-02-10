import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointments from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.body;
    try {
      const listProviderAppointments = container.resolve(
        ListProviderAppointments,
      );

      const appointments = await listProviderAppointments.execute({
        day,
        month,
        year,
        provider_id,
      });

      return response.json(appointments);
    } catch (err) {
      return response.json({ Err: err });
    }
  }
}
