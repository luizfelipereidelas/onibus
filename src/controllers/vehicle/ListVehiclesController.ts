import logError from 'utils/logger';
import { WebError } from 'errors/web-error';
import { IVehicle } from 'models/vehicle';
import VehicleRepository from 'repositories/firestore/vehicle';

class ListVehiclesController {
  public async execute(): Promise<Array<IVehicle>> {
    const vehicleRepository = new VehicleRepository();

    try {
      const vehicles = await vehicleRepository.findAll();
      const usersToJSON = vehicles.map(vehicle => vehicle.toJSON());

      return usersToJSON;
    } catch (err: any) {
      logError(err);
      throw new WebError('Failed to delete vehicle', 500, { enable: true, times: 3 });
    }
  }
}

export { ListVehiclesController };
