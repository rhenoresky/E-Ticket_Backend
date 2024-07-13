import { t } from "elysia";

export const accountDto = {
  signUpBodyDto: t.Object({
    email: t.String({ format: "email" }),
    password: t.String(),
    fullname: t.Optional(t.String()),
  }),

  signInBodyDto: t.Object({
    email: t.String({ format: "email" }),
    password: t.String(),
  }),

  updateAccountDto: t.Object({
    email: t.Optional(t.String({ format: "email" })),
    password: t.Optional(t.String()),
    fullname: t.Optional(t.String()),
    role: t.Optional(t.Union([t.Literal("ADMIN"), t.Literal("USER")])),
  }),
};
