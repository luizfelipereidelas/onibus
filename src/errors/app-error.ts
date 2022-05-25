import AbstractError, { IError, IToJSON } from './abstract-error';

// https://firebase.google.com/docs/functions/writing-and-viewing-logs
type EnumRegistryType = 'log' | 'info' | 'warn' | 'error';

interface IAppError extends IError {
  registryType: EnumRegistryType;
}

type IToJSONApp = IToJSON;

export class AppError extends AbstractError implements IAppError {
  public readonly registryType: EnumRegistryType;

  constructor(message: string, statusCode = 400, registryType: EnumRegistryType) {
    super(message, statusCode);
    this.registryType = registryType;
  }

  public toJSON(): IToJSONApp {
    return {
      message: this.message,
    };
  }
}
