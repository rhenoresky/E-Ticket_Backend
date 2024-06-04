import { NotFoundError } from "elysia";
import InvariantError from "../../../exceptions/InvariantError";
import { getAccount } from "../handler";

export const checkAccount = async ({ exist, where, select }) => {
  if (exist === true) {
    const account = await getAccount({ where, select });
    if (!account) {
      throw new NotFoundError("Account not found");
    }

    return account;
  } else {
    const account = await getAccount({ where, select });
    if (account) {
      throw new InvariantError("Account already exists");
    }
  }
};
