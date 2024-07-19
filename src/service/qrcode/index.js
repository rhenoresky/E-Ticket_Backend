import QR from "qrcode";
import BaseStorage from "../../abstract/BaseStorage";
import { InternalServerError } from "elysia";

class QRCode extends BaseStorage {
  constructor(path) {
    super(path);
  }

  async create(data) {
    try {
      const fileName = `${this._path}/${data.userName}-${data.eventName}-${Date.now()}.png`;
      const qrData = JSON.stringify(data);
      await QR.toFile(fileName, qrData, { type: "png" });
      return `${process.env.HOST}/ticket/${fileName}`;
    } catch (err) {
      console.error("Terjadi kesalahan saat menghasilkan QR code:", err);
      throw new InternalServerError("Server Error");
    }
  }
}

export default QRCode;
