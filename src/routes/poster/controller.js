import { Elysia } from "elysia";
import { posterDto } from "./dto";
import FileStorage from "../../service/storage";

const fileStorage = new FileStorage(path.resolve(__dirname, "../../public/images"));

export const posterController = new Elysia({ prefix: "/poster" }).get(
  "/:id",
  async ({ params: { id } }) => {
    return await fileStorage.readFile(id);
  },
  {
    params: posterDto.getParamsDto,
  }
);
