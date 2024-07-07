import { prisma } from "../../db/prisma";
import { passwordHashing } from "../../utils/hash";

const deleteAccountsHelper = async () => await prisma.account.deleteMany();
const getAccountByEmailHelper = async (email = "user1@gmail.com") => {
  return await prisma.account.findUnique({
    where: {
      email,
    },
    select: {
      email: true,
    },
  });
};

const addAccountHelper = async ({
  email = "user1@gmail.com",
  password = "user1",
}) => {
  const id = Date.now().toString();
  const passwordHash = await passwordHashing(password);

  await prisma.account.create({
    data: {
      id,
      email,
      password: passwordHash,
    },
  });
};

export { deleteAccountsHelper, getAccountByEmailHelper, addAccountHelper };
