import ClientError from "./ClientError";

class AuthenticationError extends ClientError {
  constructor(message) {
    super(message);
    this.status = 401;
    this.name = this.constructor.name;
  }
}

export default AuthenticationError;
