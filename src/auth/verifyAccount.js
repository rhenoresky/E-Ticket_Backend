import { prisma } from "../db/prisma";
import AuthenticationError from "../exceptions/AuthenticationError";

export const verifyAccount = async ({ request, bearer, jwtTicket }) => {
  if (!bearer) {
    throw new AuthenticationError("Invalid token");
  }

  const isUser = await jwtTicket.verify(bearer);

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
};
