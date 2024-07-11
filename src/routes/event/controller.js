import { Elysia } from "elysia";
import { prisma } from "../../db/prisma";
import { eventDto } from "./dto";
import { verifyAccount } from "../../auth/verifyAccount";
import EventHandler from "./handler";
import AuthorizationError from "../../exceptions/AuthorizationError";
import FileStorage from "../../service/storage";
import path from "node:path";

const eventHandler = new EventHandler(prisma);
const fileStorage = new FileStorage(path.resolve(__dirname, "../../public/images"));

export const eventController = new Elysia({ prefix: "/event" })
  .post(
    "/",
    async ({ body, set, request: { account } }) => {
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
    async ({ params: { id } }) => {
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
    async ({ params: { id }, body, request: { account } }) => {
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
    async ({ params: { id }, request: { account } }) => {
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
    async ({ body, set, params: { id }, request: { account } }) => {
      if (account.role !== "ADMIN") {
        throw new AuthorizationError("You are not an admin");
      }

      const event = await eventHandler.checkEventIsExist(id);
      if (!event) throw new NotFoundError("Event not found");

      const url = await fileStorage.writeFile(body.file);

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
    async ({ params: { id } }) => {
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
