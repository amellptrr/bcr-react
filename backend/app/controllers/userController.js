const userService = require("../services/userService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const Salt = 10;

/* Create token function */
function createToken(data) {
  return jwt.sign(data, process.env.JWT_SECRET || "secret");
}

function encryptPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, Salt, (err, encryptedPassword) => {
      if (!!err) {
        reject(err);
        return;
      }
      resolve(encryptedPassword);
    });
  });
}

function checkPassword(encryptedPassword, password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, encryptedPassword, (err, isPasswordCorrect) => {
      if (!!err) {
        reject(err);
        return;
      }
      resolve(isPasswordCorrect);
    });
  });
}

class userController {
  static async register(req, res) {
    const { fullname, email, confPassword } = req.body;
    const password = await encryptPassword(req.body.password);

    // const user = await User.findOne({
    //   where: { email },
    // });

    if (req.body.password !== confPassword) {
      res.status(422).json({
        status: "FAIL",
        message: "Password dan Confirm Password tidak cocok",
      });
      return;
    }

    // const token = createToken({
    //   id: user.id,
    //   email: user.email,
    //   createdAt: user.createdAt,
    //   updatedAt: user.updatedAt,
    // });

    userService.create({ fullname, email, password })
      .then(async (post) => {
        const user = await User.findOne({
          where: { email },
        });
        const token = createToken({
          id: user.id,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        });
        res.status(201).json({
          status: "OK",
          token: token,
          data: post,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  }
  static async login(req, res) {
    // const { email, password } = req.body;
    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    const user = await userService.find(email);

    if (!user) {
      res.status(404).json({ message: "Email tidak ketemu" });
      return;
    }

    const isPasswordCorrect = await checkPassword(user.password, password);

    if (!isPasswordCorrect) {
      res.status(401).json({ message: "salah" });
      return;
    }

    // buat token
    const token = createToken({
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });

    //return
    res.status(201).json({
      id: user.id,
      email: user.email,
      token,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }
}

module.exports = userController;
