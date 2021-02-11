import ICreateNotifcationDTO from '../dtos/ICreateNotifcationDTO';
import Notification from '../infra/typeorm/schemas/Notification';

export default interface INotificationsRepository {
  create(data: ICreateNotifcationDTO): Promise<Notification>;
}
