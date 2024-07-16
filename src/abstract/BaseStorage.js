import { unlink } from "node:fs/promises";
import { existsSync, mkdirSync } from "node:fs";
import { InternalServerError, NotFoundError } from "elysia";

class BaseStorage {
  constructor(path) {
    this._path = path;

    if (!existsSync(path)) {
      mkdirSync(path, { recursive: true });
    }
  }

  async removeFile(id) {
    try {
      const file = `${this._path}/${id}`;
      await unlink(file);
    } catch (err) {
      console.log(err);
      throw new InternalServerError("Server Error");
    }
  }

  async readFile(id) {
    const file = Bun.file(`${this._path}/${id}`);

    const fileExist = await file.exists();
    if (!fileExist) throw new NotFoundError("File not found");

    return file;
  }
}

export default BaseStorage;
