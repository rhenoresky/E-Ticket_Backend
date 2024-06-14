import { prisma } from "../../db/prisma";

class EventHandler {
  constructor(db) {
    this._db = prisma;
  }

  async postEvent(body) {
    return await this._db.event.create({
      data: body,
      select: {
        id: true,
      },
    });
  }

  async getEvent(id) {
    return await this._db.event.findUnique({
      where: {
        id,
      },
    });
  }

  async putEvent(id, body) {
    await this._db.event.update({
      where: {
        id,
      },
      data: body,
    });
  }

  async deleteEvent(id) {
    await this._db.event.delete({
      where: {
        id,
      },
    });
  }

  async checkEventIsExist(id) {
    return await this._db.event.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
  }

  async addPoster(eventId, linkImage) {
    await this._db.poster.create({
      data: {
        eventId,
        linkImage,
      },
    });
  }

  async getEventPosterById(id) {
    return await this._db.poster.findMany({
      where: {
        eventId: id,
      },
      select: {
        id: true,
        linkImage: true,
      },
    });
  }
}

export default EventHandler;
