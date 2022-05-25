import express, { Request, Response, NextFunction } from 'express';

const middleware = express();

middleware.use(express.json());

const validateVehicleUpdateFields = async (req: Request, res: Response, next: NextFunction) => {
  const { image, name, description, price, year, km } = req.body;

  if (image === undefined || typeof image !== 'string') {
    return res.status(400).json({ message: 'Image field is not valid' });
  }
  if (name === undefined || typeof name !== 'string') {
    return res.status(400).json({ message: 'Name field is not valid' });
  }
  if (description === undefined || typeof description !== 'string') {
    return res.status(400).json({ message: 'Description field is not valid' });
  }
  if (price === undefined || typeof price !== 'string') {
    return res.status(400).json({ message: 'Price field is not valid' });
  }
  if (year === undefined || typeof year !== 'string') {
    return res.status(400).json({ message: 'Year field is not valid' });
  }
  if (km === undefined || typeof km !== 'number') {
    return res.status(400).json({ message: 'Km field is not valid' });
  }

  return next();
};

middleware.use(validateVehicleUpdateFields);

export default middleware;
