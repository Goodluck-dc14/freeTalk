import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super("not found");
  }

  generateErrors() {
    return [{ message: "not found" }];
  }
}
