export class CustomError extends Error {
  constructor(message: string, data?: unknown) {
    super(message);
  }
}
