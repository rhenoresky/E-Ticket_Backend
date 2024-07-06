import { Elysia } from "elysia";
import { verifyAccount } from "../../auth/verifyAccount";
import { prisma } from "../../db/prisma";
import { hash } from "../../utils/hash";
import { accountDto } from "./dto";
import AuthenticationError from "../../exceptions/AuthenticationError";
import AuthorizationError from "../../exceptions/AuthorizationError";
import AccountHandler from "./handler";

const accountHandler = new AccountHandler(prisma);

export const accountController = new Elysia({ prefix: "/account" })
  .post(
    "/signup",
    async ({ body, set }) => {
      await accountHandler.checkAccount({
        exist: false,
        where: { email: body.email },
        select: { id: true },
      });

      body.password = await hash.passwordHashing(body.password);
      await accountHandler.postAccount({ id: generateId(), body });
      set.status = 201;
      return {
        status: "success",
        message: "Account created successfully",
      };
    },
    {
      body: accountDto.signUpBodyDto,
    }
  )

  .post(
    "/signin",
    async ({ body, jwtTicket }) => {
      const account = await accountHandler.checkAccount({
        exist: true,
        where: { email: body.email },
        select: { id: true, password: true },
      });

      const isMatch = await hash.passwordCompare(body.password, account.password);
      if (!isMatch) {
        throw new AuthenticationError("Incorrect password");
      }
      delete account.password;

      const token = `Bearer ${await jwtTicket.sign(account)}`;
      return {
        status: "success",
        token,
      };
    },
    {
      body: accountDto.signInBodyDto,
    }
  )

  .patch(
    "/:id",
    async ({ request: { account }, params: { id }, body, passwordHashing }) => {
      if (account.role !== "ADMIN") {
        throw new AuthorizationError("You are not an admin");
      }

      await checkAccount({ exist: true, where: { id }, select: { id: true } });

      if (body.email) {
        await checkAccount({
          exist: false,
          where: { email: body.email },
          select: { id: true },
        });
      }

      if (body.password) {
        body.password = await passwordHashing(body.password);
      }

      await updateAccount({ id, body });

      return {
        status: "success",
        message: "Account updated successfully",
      };
    },
    {
      body: updateAccountDto,
      beforeHandle: verifyAccount,
    }
  );
