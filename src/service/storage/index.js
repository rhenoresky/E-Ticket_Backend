class Storage {
  constructor(folder) {
    this._folder = folder;

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
  }

  async writeFIle(file) {
    const fileName = `${Date.now()}-${file.name}`;
    await Bun.write(`${this._folder}/${fileName}`, file);

    return `${process.env.HOST}/poster/${fileName}`;
  }
}

export default Storage;
