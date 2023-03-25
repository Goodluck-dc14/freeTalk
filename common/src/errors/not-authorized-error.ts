import { CustomError } from "./custom-error";

export class NotAuthorized extends CustomError {
  statusCode = 401;

  constructor() {
    super("not authorized");
  }

  generateErrors() {
    return [{ message: "not authorized" }];
  }
}
