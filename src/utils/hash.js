export const hash = {
  passwordHashing: async (password) => {
    return await Bun.password.hash(password, {
      algorithm: "bcrypt",
      cost: 8,
    });
  },

  passwordCompare: async (password, passwordHash) => {
    return await Bun.password.verify(password, passwordHash, "bcrypt");
  },
};
