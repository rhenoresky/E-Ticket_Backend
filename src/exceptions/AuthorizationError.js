import ClientError from "./ClientError";

class AuthorizationError extends ClientError {
  constructor(message) {
    super(message);
    this.status = 403;
    this.name = this.constructor.name;
  }
}

export default AuthorizationError;
