import QR from "qrcode";
import fs from "fs";

class QRCode {
  constructor(folder) {
    this._folder = folder;

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
  }

  async create(data) {
    try {
      const fileName = `${this._folder}/${data.userName}-${data.eventName}-${Date.now()}.png`;
      const qrData = JSON.stringify(data);
      await QR.toFile(fileName, qrData, { type: "png" });
      return `${process.env.HOST}/ticket/${fileName}`;
    } catch (err) {
      console.error("Terjadi kesalahan saat menghasilkan QR code:", err);
    }
  }
}

export default QRCode;
