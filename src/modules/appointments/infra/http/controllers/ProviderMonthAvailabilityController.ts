import { container } from 'tsyringe';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';
import { Request, Response } from 'express';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.query;

    try {
      const ListProviderMonthAvailability = container.resolve(
        ListProviderMonthAvailabilityService,
      );

      const availability = await ListProviderMonthAvailability.execute({
        provider_id,
        month: Number(month),
        year: Number(year),
      });

      return response.json(availability);
    } catch (err) {
      return response.json({ error: err });
    }
  }
}
