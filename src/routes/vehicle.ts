import * as functions from 'firebase-functions';
import {
  CreateVehiclesController,
  DestroyVehicleController,
  ListVehiclesController,
  UpdateVehicleController,
} from 'controllers/vehicle';

import express from 'express';
import cors from 'cors';

import validateVehicleUpdateFields from 'middlewares/validate-vehicle-update-fields';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  const listVehiclesController = new ListVehiclesController();

  return listVehiclesController
    .execute()
    .then(vehicles => {
      res.json(vehicles);
    })
    .catch(err => res.status(err.statusCode || 500).json(err.statusCode ? err.toJSON() : { message: err.message }));
});
export const getVehicles = functions.https.onRequest(app);
app.routes = {};

app.use(express.json());
app.use(cors());
app.use(validateVehicleUpdateFields);
app.post('/', async (req, res) => {
  const { image, name, description, price, year, km } = req.body;

  const createVehiclesController = new CreateVehiclesController();
  try {
    const id = await createVehiclesController.execute({
      image,
      name,
      description,
      price,
      year,
      km,
    });

    return res.json({ id });
  } catch (err: any) {
    return res.status(err.statusCode || 500).json(err.statusCode ? err.toJSON() : { message: err.message });
  }
});
export const postVehicle = functions.https.onRequest(app);
app.routes = {};

app.use(express.json());
app.use(cors());

app.delete('/', (req, res) => {
  const { id } = req.query;

  const destroyVehicleController = new DestroyVehicleController();

  if (id && typeof id === 'string') {
    destroyVehicleController
      .execute({ id })
      .then(destroyResult => {
        if (destroyResult) {
          return res.json({ message: `Vehicle ${id} deleted` });
        }
        return res.status(500).json({ message: 'Failed to delete vehicle' });
      })
      .catch(err => res.status(err.statusCode || 500).json(err.statusCode ? err.toJSON() : { message: err.message }));
  }
});
export const deleteVehicle = functions.https.onRequest(app);
app.routes = {};

app.use(express.json());
app.use(cors());
app.use(validateVehicleUpdateFields);
app.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { image, name, description, price, year, km } = req.body;

  const updateVehicleController = new UpdateVehicleController();
  if (id && typeof id === 'string') {
    try {
      const updateResult = await updateVehicleController.execute({
        id,
        image,
        name,
        description,
        price,
        year,
        km,
      });

      if (updateResult) {
        return res.json({ message: 'Vehicle updated' });
      }
      return res.status(500).json({ message: 'Failed to update vehicle' });
    } catch (err: any) {
      return res.status(err.statusCode || 500).json(err.statusCode ? err.toJSON() : { message: err.message });
    }
  } else {
    return res.status(400).json({ message: 'Id field is not valid' });
  }
});
export const putVehicle = functions.https.onRequest(app);
app.routes = {};
