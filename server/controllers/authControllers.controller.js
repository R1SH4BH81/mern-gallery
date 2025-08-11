const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
  try {
    const { username, email, passowrd } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "user exists already!" });
    }

    const hashedPass = await bcrypt.hash(passowrd, 10);
    const user = new User({ email, username, password: hashedPass });
    await user.save();
    res.status(200).json({ message: "new user created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (!findUser) {
      res.status(404).json({ message: "user not found pls register" });
    }

    const isMatch = await bcrypt.match(password, findUser.password);
    if (!isMatch) {
      res.status(404).json({ message: "password galat h bhai" });
    }

    const token = jwt.sign({ id: findUser._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
      user: {
        id: findUser._id,
        username: findUser.username,
        email: findUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { login, register };
