type Data = any | null;

abstract class ResponseObject {
  constructor(
    public success: boolean,
    public message: string,
    public data: Data = null,
  ) {}
}

export class SuccessResponseObject extends ResponseObject {
  constructor(message: string, data: Data = null) {
    super(true, message, data);
  }
}

export class ErrorResponseObject extends ResponseObject {
  constructor(message: string, data: Data = null) {
    super(false, message, data);
  }
}
