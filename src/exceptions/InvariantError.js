import ClientError from "./ClientError";

class InvariantError extends ClientError {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

export default InvariantError;
