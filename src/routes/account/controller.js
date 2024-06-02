import { Elysia } from "elysia";
import { generateId } from "../../tools/generateId";
import { postAccount, updateAccount } from "./handler";
import { signInBodyDto, signUpBodyDto, updateAccountDto } from "./dto";
import { passwordCompare, passwordHashing } from "../../tools/hash";
import AuthenticationError from "../../exceptions/AuthenticationError";
import { verifyAccount } from "../../auth/verifyAccount";
import AuthorizationError from "../../exceptions/AuthorizationError";
import { checkAccount } from "./utils/checkAccount";

export const accountController = new Elysia({ prefix: "/account" })
  .decorate({ generateId, passwordHashing, passwordCompare })
  .post(
    "/signup",
    async ({ body, generateId, passwordHashing, set }) => {
      await checkAccount({
        exist: false,
        where: { email: body.email },
        select: { id: true },
      });

      body.password = await passwordHashing(body.password);
      await postAccount({ id: generateId(), body });

      set.status = 201;
      return {
        status: "success",
        message: "Account created successfully",
      };
    },
    {
      body: signUpBodyDto,
    }
  )

  .post(
    "/signin",
    async ({ body, jwtTicket, passwordCompare }) => {
      const account = await checkAccount({
        exist: true,
        where: { email: body.email },
        select: { id: true, password: true },
      });

      const isMatch = await passwordCompare(body.password, account.password);
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
      body: signInBodyDto,
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
