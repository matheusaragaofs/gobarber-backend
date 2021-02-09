import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsController = new AppointmentsController();

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);
appointmentsRouter.post('/', appointmentsController.create);

// appointmentsRouter.get('/', async (request, response) => {
//   console.log(request.user);
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

export default appointmentsRouter;
