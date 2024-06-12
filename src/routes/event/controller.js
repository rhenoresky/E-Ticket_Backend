import { Elysia } from "elysia";
import { prisma } from "../../db/prisma";
import EventHandler from "./handler";
import { verifyAccount } from "../../auth/verifyAccount";
import { eventDto } from "./dto";
import AuthorizationError from "../../exceptions/AuthorizationError";

export const eventController = new Elysia({ prefix: "/event" })
  .decorate({ eventHandler: new EventHandler(prisma) })
  .post(
    "/",
    async ({ body, eventHandler, set, request: { account } }) => {
      if (account.role !== "ADMIN") {
        throw new AuthorizationError("You are not an admin");
      }
      const data = await eventHandler.postEvent(body);

      set.status = 201;
      return {
        status: "success",
        data,
      };
    },
    {
      beforeHandle: verifyAccount,
      body: eventDto.postDto,
    }
  )

  .get(
    "/:id",
    async ({ params: { id }, eventHandler }) => {
      const event = await eventHandler.getEvent(id);

      return {
        status: "success",
        data: event,
      };
    },
    {
      params: eventDto.paramsDto,
    }
  )

  .patch(
    "/:id",
    async ({ params: { id }, body, eventHandler, request: { account } }) => {
      if (account.role !== "ADMIN") {
        throw new AuthorizationError("You are not an admin");
      }
      await eventHandler.putEvent(id, body);

      return {
        status: "success",
        message: "Successfully updated event",
      };
    },
    {
      beforeHandle: verifyAccount,
      params: eventDto.paramsDto,
      body: eventDto.putDto,
    }
  )

  .delete(
    "/:id",
    async ({ params: { id }, eventHandler, request: { account } }) => {
      if (account.role !== "ADMIN") {
        throw new AuthorizationError("You are not an admin");
      }

      await eventHandler.deleteEvent(id);

      return {
        status: "success",
        message: "Successfully delete event",
      };
    },
    {
      beforeHandle: verifyAccount,
      params: eventDto.paramsDto,
    }
  )
  .post(
    "/:id/poster",
    async ({
      body,
      set,
      eventHandler,
      params: { id },
      request: { account },
    }) => {
      if (account.role !== "ADMIN") {
        throw new AuthorizationError("You are not an admin");
      }

      const event = await eventHandler.checkEventIsExist(id);
      if (!event) throw new NotFoundError("Event not found");

      const fileName = `${Date.now()}-${body.file.name}`;
      await Bun.write(process.env.PATH_IMG + fileName, body.file);
      const url = `${process.env.HOST}/poster/${fileName}`;

      await eventHandler.addPoster(id, url);
      set.status = 201;
      return {
        status: "success",
        url,
      };
    },
    {
      beforeHandle: verifyAccount,
      body: eventDto.postFileDto,
      params: eventDto.paramsDto,
    }
  )
  .get(
    "/:id/poster",
    async ({ eventHandler, params: { id } }) => {
      const poster = await eventHandler.getEventPosterById(id);

      return {
        status: "success",
        poster,
      };
    },
    {
      params: eventDto.paramsDto,
    }
  );
