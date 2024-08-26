import { prisma } from "../../db/prisma";

class TicketHandler {
  constructor(db) {
    this._db = prisma;
  }

  async createTicket(data) {
    await prisma.ticket.create({
      data,
    });
  }
}

export default TicketHandler;
