import { Elysia } from "elysia";
import { prisma } from "../../db/prisma";
import AuthenticationError from "../../exceptions/AuthenticationError";

const user = [];

export const ws = new Elysia().ws("/ws", {
  beforeHandle: async ({ request, query: { bearer }, jwtTicket }) => {
    if (!bearer) {
      throw new AuthenticationError("Tokens are required");
    }

    const token = bearer.split(" ");

    if (token[0] !== "Bearer") {
      throw new AuthenticationError("Invalid token");
    }

    if (!token[1]) {
      throw new AuthenticationError("Invalid token");
    }

    const isUser = await jwtTicket.verify(token[1]);

    if (!isUser) {
      throw new AuthenticationError("Invalid token");
    }

    const account = await prisma.account.findUnique({
      where: {
        id: isUser.id,
      },
      select: {
        id: true,
        role: true,
      },
    });

    if (!account) {
      throw new AuthenticationError("Your account is incorrect");
    }

    request.account = account;
  },
  open(ws) {
    ws.send("Welcome to e_ticket");
    console.log(ws.data.request.account.id);
    user.push(ws);
  },
  close(ws) {
    const index = user.findIndex(
      (u) => u.data.request.account.id === ws.data.request.account.id
    );
    user.splice(index, 1);
  },
  message(ws, message) {
    const index = user.findIndex(
      (u) => u.data.request.account.id === message.to
    );
    if (index < 0) {
      ws.send("User offline or not exist");
      return;
    }
    user[index].send(message.msg);
  },
});
