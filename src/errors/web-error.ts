import AbstractError, { IError, IToJSON } from './abstract-error';

interface IShouldIRetry {
  enable: boolean;
  times: number | undefined;
}

interface IWebError extends IError {
  shouldIRetry: IShouldIRetry;
}

interface IToJSONWeb extends IToJSON {
  shouldIRetry: IShouldIRetry;
}

export class WebError extends AbstractError implements IWebError {
  private _shouldIRetry: IShouldIRetry;

  constructor(message: string, statusCode = 400, shouldIRetry: IShouldIRetry) {
    super(message, statusCode);
    this._shouldIRetry = shouldIRetry;
  }

  public get shouldIRetry(): IShouldIRetry {
    return this._shouldIRetry;
  }

  public set shouldIRetry(value: IShouldIRetry) {
    this._shouldIRetry = value;
  }

  public toJSON(): IToJSONWeb {
    return {
      message: this.message,
      shouldIRetry: this.shouldIRetry,
    };
  }
}
