import logError from 'utils/logger';
import { WebError } from 'errors/web-error';
import VehicleModel, { IVehicle } from 'models/vehicle';
import VehicleRepository from 'repositories/firestore/vehicle';

export type CreateVehicleDTO = Omit<IVehicle, 'id'>;

class CreateVehiclesController {
  public execute({ image, name, description, price, year, km }: CreateVehicleDTO): Promise<string> {
    const vehicleRepository = new VehicleRepository();
    const vehicleModel = new VehicleModel(null, image, name, description, price, year, km);

    return vehicleRepository.add(vehicleModel).catch(err => {
      logError(err);
      throw new WebError('Failed to create vehicle', 500, { enable: true, times: 3 });
    });
  }
}

export { CreateVehiclesController };
