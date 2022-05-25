import logError from 'utils/logger';
import { WebError } from 'errors/web-error';
import VehicleRepository from 'repositories/firestore/vehicle';

export interface DestroyVehicleDTO {
  id: string;
}

class DestroyVehicleController {
  public execute({ id }: DestroyVehicleDTO): Promise<boolean> {
    const vehicleRepository = new VehicleRepository();

    return vehicleRepository.delete(id).catch(err => {
      logError(err);
      throw new WebError('Failed to delete vehicle', 500, { enable: true, times: 3 });
    });
  }
}

export { DestroyVehicleController };
