import { InternalServerError } from "elysia";
import BaseStorage from "../../abstract/BaseStorage";

class FileStorage extends BaseStorage {
  constructor(path) {
    super(path);
  }

  async writeFile(file) {
    try {
      const fileName = `${Date.now()}-${file.name}`;
      await Bun.write(`${this._path}/${fileName}`, file);
      return `${process.env.HOST}/poster/${fileName}`;
    } catch (err) {
      console.log(err);
      throw new InternalServerError("Server Error");
    }
  }
}

export default FileStorage;
