import { Elysia } from "elysia";
import { accountController } from "./routes/account/controller";
import { jwt } from "@elysiajs/jwt";
import { Prisma } from "@prisma/client";
import { bearer } from "@elysiajs/bearer";
import { eventController } from "./routes/event/controller";
import { ws } from "./routes/ws/ws";
import { posterController } from "./routes/poster/controller";

export const app = new Elysia()
  .onError(({ error, set }) => {
    if (error.code === "VALIDATION") {
      set.status = 400;
      console.log(error.name, error.code, error.status, error.message);

      return {
        message: "Invalid or incomplete data required",
      };
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        set.status = 400;
        return { message: "email already exist" };
      }
      console.log(error.name, error.code, error.status, error.message);

      return {
        message: "Database Error",
      };
    }

    if (error.status === 500) {
      console.log(error.name, error.code, error.status, error.message);

      return {
        message: "Server error",
      };
    }

    console.log(error.name, error.code, error.status, error.message);

    set.status = error.status;

    return {
      message: error.message,
    };
  })
  .use(
    jwt({
      name: "jwtTicket",
      secret: process.env.JWT_SECRET,
      exp: "7d",
    })
  )
  .use(bearer())
  .use(accountController)
  .use(eventController)
  .use(posterController)
  .use(ws)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
