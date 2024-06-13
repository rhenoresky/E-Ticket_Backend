import { t } from "elysia";

export const eventDto = {
  postDto: t.Object({
    name: t.String(),
    description: t.String(),
    location: t.String(),
    startTime: t.Date(),
    finishTime: t.Date(),
  }),

  putDto: t.Object({
    name: t.Optional(t.String()),
    description: t.Optional(t.String()),
    location: t.Optional(t.String()),
    startTime: t.Optional(t.Date()),
    finishTime: t.Optional(t.Date()),
  }),

  paramsDto: t.Object({
    id: t.Numeric(),
  }),

  postFileDto: t.Object({
    file: t.File({ type: "image" }),
  }),
};
