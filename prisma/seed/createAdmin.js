import { prisma } from "../../src/db/prisma";
import { generateId } from "../../src/tools/generateId";
import { passwordHashing } from "../../src/utils/hash";

const createAccount = async (password, id) => {
  await prisma.account.create({
    data: {
      id,
      email: "admin@gmail.com",
      password,
      role: "ADMIN",
    },
  });
};

await createAccount(await passwordHashing("admin"), generateId());
