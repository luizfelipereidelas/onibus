import logError from 'utils/logger';
import { WebError } from 'errors/web-error';
import VehicleModel, { IVehicle } from 'models/vehicle';
import VehicleRepository from 'repositories/firestore/vehicle';

export type UpdateVehicleDTO = IVehicle;

class UpdateVehicleController {
  public execute({ id, image, name, description, price, year, km }: UpdateVehicleDTO): Promise<boolean> {
    const vehicleRepository = new VehicleRepository();

    const vehicleModel = new VehicleModel(id, image, name, description, price, year, km);

    return vehicleRepository.update(vehicleModel).catch(err => {
      logError(err);
      throw new WebError('Failed to create vehicle', 500, { enable: true, times: 3 });
    });
  }
}

export { UpdateVehicleController };
