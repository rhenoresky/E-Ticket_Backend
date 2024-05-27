class ClientError extends Error {
  constructor(message, status = 400) {
    super(message);

    if (this.constructor.name === "ClientError") {
      throw new Error("cannot instantiate abstract class");
    }

    this.status = status;
    this.name = "ClientError";
  }
}

export default ClientError;
