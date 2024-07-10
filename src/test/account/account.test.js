import { afterEach, describe, expect, it } from "bun:test";
import { app } from "../..";
import {
  addAccountHelper,
  deleteAccountsHelper,
  getAccountByEmailHelper,
} from "../helper/acountHelper";

describe("/account endpoint", () => {
  afterEach(async () => deleteAccountsHelper());
  describe("when POST /account/signup", () => {
    it("should return a 201 response and successfully add the account", async () => {
      const body = {
        email: "user@gmail.com",
        password: "user",
      };

      const payload = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await app.handle(
        new Request("http://localhost:3000/account/signup", payload)
      );
      const responseJson = await response.json();
      const account = await getAccountByEmailHelper(body.email);

      expect(response.status).toEqual(201);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.message).toBeDefined();
      expect(account).toMatchObject({ email: body.email });
    });

    it("should return a 400 response if the required data is incomplete", async () => {
      const body = {
        email: "user@gmail.com",
      };

      const payload = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await app.handle(
        new Request("http://localhost:3000/account/signup", payload)
      );
      const responseJson = await response.json();
      const account = await getAccountByEmailHelper(body.email);

      expect(response.status).toEqual(400);
      expect(responseJson.message).toBeDefined();
      expect(account).toBeNull();
    });

    it("should return a 400 response if it sends data that it does not need", async () => {
      const body = {
        email: "user@gmail.com",
        password: "user",
        hoby: "swimming",
      };

      const payload = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await app.handle(
        new Request("http://localhost:3000/account/signup", payload)
      );
      const responseJson = await response.json();
      const account = await getAccountByEmailHelper(body.email);

      expect(response.status).toEqual(400);
      expect(responseJson.message).toBeDefined();
      expect(account).toBeNull();
    });

    it("should respond 400 if the email is invalid", async () => {
      const body = {
        email: "usergmail.com",
        password: "user",
      };

      const payload = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await app.handle(
        new Request("http://localhost:3000/account/signup", payload)
      );
      const responseJson = await response.json();
      const account = await getAccountByEmailHelper(body.email);

      expect(response.status).toEqual(400);
      expect(responseJson.message).toBeDefined();
      expect(account).toBeNull();
    });

    it("should respond 400 if the email is registered", async () => {
      const body = {
        email: "user@gmail.com",
        password: "user",
      };

      await addAccountHelper(body);

      const payload = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await app.handle(
        new Request("http://localhost:3000/account/signup", payload)
      );
      const responseJson = await response.json();

      expect(response.status).toEqual(400);
      expect(responseJson.message).toBeDefined();
    });
  });

  describe("when POST /account/signin", () => {
    it("should respond 200 and provide token data", async () => {
      const body = {
        email: "user@gmail.com",
        password: "user",
      };

      await addAccountHelper(body);

      const payload = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await app.handle(
        new Request("http://localhost:3000/account/signin", payload)
      );
      const responseJson = await response.json();

      expect(response.status).toEqual(200);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.token).toBeDefined();
    });

    it("must respond 401 if the password is incorrect", async () => {
      await addAccountHelper({});

      const body = {
        email: "user1@gmail.com",
        password: "user",
      };

      const payload = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await app.handle(
        new Request("http://localhost:3000/account/signin", payload)
      );
      const responseJson = await response.json();

      expect(response.status).toEqual(401);
      expect(responseJson.message).toBeDefined();
    });

    it("should respond 404 if the email does not exist", async () => {
      await addAccountHelper({});

      const body = {
        email: "user2@gmail.com",
        password: "user1",
      };

      const payload = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await app.handle(
        new Request("http://localhost:3000/account/signin", payload)
      );
      const responseJson = await response.json();

      expect(response.status).toEqual(404);
      expect(responseJson.message).toBeDefined();
    });
  });
});
