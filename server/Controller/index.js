const { User } = require("../models/index");
const nodemailer = require("nodemailer");
const { verifiedPass, createToken } = require("../helps/help");

class Controller {
  static async register(req, res, next) {
    try {
      const { email, password, name } = req.body;
      const inputData = { email, password, name };

      if (!email) {
        throw { name: "Email is required" };
      }

      if (!password) {
        throw { name: "Password is required" };
      }

      if (!name) {
        throw { name: "Name is required" };
      }

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "randychan35@gmail.com",
          pass: "ehvdovnblfkpenzy",
        },
      });

      const mailOptions = {
        from: "randychan35@gmail.com",
        to: email,
        subject: "Music Yuhu",
        text: `HAI ${name}, Terima Kasih telah mendaftar.`,
      };

      const newUser = await User.create(inputData);

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          const result = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
          };

          res.status(201).json(result);
        }
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "Email is required" };
      }

      if (!password) {
        throw { name: "Password is required" };
      }

      const findUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!findUser) {
        throw { name: "Invalid email/password" };
      }

      const checkPass = verifiedPass(password, findUser.password);

      if (!checkPass) {
        throw { name: "Invalid email/password" };
      }

      const payload = {
        id: findUser.id,
        email: findUser.email,
      };

      const token = createToken(payload);

      res.status(200).json({ access_token: token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = {
  Controller,
};
