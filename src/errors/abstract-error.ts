export interface IToJSON {
  message: string;
}

export interface IError {
  message: string;
  statusCode: number;

  toJSON(): IToJSON;
}

abstract class Error implements IError {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }

  public abstract toJSON(): IToJSON;
}

export default Error;
