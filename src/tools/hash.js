const passwordHashing = async (password) => {
  return await Bun.password.hash(password, {
    algorithm: "bcrypt",
    cost: 8,
  });
};

const passwordCompare = async (password, passwordHash) => {
  return await Bun.password.verify(password, passwordHash, "bcrypt");
};

export { passwordHashing, passwordCompare };
