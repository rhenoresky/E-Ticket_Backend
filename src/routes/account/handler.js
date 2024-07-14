import { NotFoundError } from "elysia";
import InvariantError from "../../exceptions/InvariantError";

class AccountHandler {
  constructor(db) {
    this._db = db;
  }

  async postAccount({ id, body }) {
    await this._db.account.create({
      data: {
        id,
        ...body,
      },
      select: {
        id: true,
      },
    });
  }

  async getAccount({ where, select }) {
    const account = await this._db.account.findUnique({
      where,
      select,
    });

    return account;
  }

  async updateAccount({ id, body }) {
    await this._db.account.update({
      where: {
        id,
      },
      data: {
        ...body,
      },
    });
  }

  async checkAccount({ exist, where, select }) {
    if (exist === true) {
      const account = await this.getAccount({ where, select });
      if (!account) {
        throw new NotFoundError("Account not found");
      }

      return account;
    } else {
      const account = await this.getAccount({ where, select });
      if (account) {
        throw new InvariantError("Account already exists");
      }
    }
  }
}

export default AccountHandler;
