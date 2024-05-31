import { t } from "elysia";

const signUpBodyDto = t.Object({
  email: t.String({ format: "email" }),
  password: t.String(),
  fullname: t.Optional(t.String()),
});

const signInBodyDto = t.Object({
  email: t.String({ format: "email" }),
  password: t.String(),
});

const updateAccountDto = t.Object({
  email: t.Optional(t.String({ format: "email" })),
  password: t.Optional(t.String()),
  fullname: t.Optional(t.String()),
  role: t.Optional(t.Union([t.Literal("ADMIN"), t.Literal("USER")])),
});

export { signInBodyDto, signUpBodyDto, updateAccountDto };
