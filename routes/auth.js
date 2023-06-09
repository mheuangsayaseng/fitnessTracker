const authRouter = require("express").Router();
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
const { createUser } = require("../db/adapters/users");

//Post /api/auth/signup

authRouter.post("/signup", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hash(password, SALT_ROUNDS);
    const user = await createUser({ username, password: hashedPassword });
    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = authRouter;
