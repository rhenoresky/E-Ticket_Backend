import { prisma } from "../../db/prisma";

const postAccount = async ({ id, body }) => {
  await prisma.account.create({
    data: {
      id,
      ...body,
    },
    select: {
      id: true,
    },
  });
};

const getAccount = async ({ where, select }) => {
  const account = await prisma.account.findUnique({
    where,
    select,
  });

  return account;
};

const updateAccount = async ({ id, body }) => {
  await prisma.account.update({
    where: {
      id,
    },
    data: {
      ...body,
    },
  });
};

export { getAccount, postAccount, updateAccount };
