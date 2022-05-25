import { log, warn, error, info } from 'firebase-functions/logger';
import { AppError } from 'errors/app-error';

export default (err: Error | AppError) => {
  if (err instanceof AppError) {
    switch (err.registryType) {
      case 'error':
        error(err.message, err.toJSON());
        break;
      case 'info':
        info(err.message, err.toJSON());
        break;
      case 'warn':
        warn(err.message, err.toJSON());
        break;
      case 'log':
      default:
        log(err.message, err.toJSON());
        break;
    }
  } else {
    log(err.message, err);
  }
};
