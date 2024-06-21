import { Elysia, NotFoundError } from "elysia";
import { posterDto } from "./dto";

export const posterController = new Elysia({ prefix: "/poster" }).get(
  "/:id",
  async ({ params: { id } }) => {
    const file = Bun.file(process.env.PATH_IMG + id);

    const res = await file.exists();
    if (!res) throw new NotFoundError("File not found");

    return file;
  },
  {
    params: posterDto.getParamsDto,
  }
);
