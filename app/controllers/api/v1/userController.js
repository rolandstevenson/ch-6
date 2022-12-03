const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../../models");
const SALT = 10;

//get all users
getAllUsers = async (req, res) => {
  try {
    if (req.user.role === "superadmin") {
      const users = await User.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.send({
        message: "Response Success",
        data: {
          users,
        },
      });
    } else {
      res.send({
        message: "You are not authorized to access this information!",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//register user
register = async (req, res) => {
  try {
    const { email, password, role, confPassword } = req.body;
    if (role === "admin") {
      res.status(400).send({
        message: "You are not allowed to register as admin",
      });
    } else {
      if (password !== confPassword) return res.status(400).json({ msg: "Password and Confirm Password not Same " });

      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (user) {
        res.send({
          message: "Email already exist",
        });
      } else {
        const hashPassword = await bcrypt.hash(password, SALT);
        const newUser = await User.create({
          email,
          password: hashPassword,
          role,
        });
        res.send({
          message: "Register Success",
          data: {
            newUser,
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

//register admin
registerAdmin = async (req, res) => {
  try {
    const { email, password, role, confPassword } = req.body;
    if (req.user.role === "superadmin") {
      if (password !== confPassword) return res.status(400).json({ msg: "Password and Confirm Password not Same" });

      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (user) {
        res.send({
          message: "Email already exist",
        });
      } else {
        const hashPassword = await bcrypt.hash(password, SALT);
        const newUser = await User.create({
          email,
          password: hashPassword,
          role,
        });
        res.send({
          message: "Register Success",
          data: {
            newUser,
          },
        });
      }
    } else {
      res.status(400).send({
        message: "You are not allowed to register as admin",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//login user
login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      res.send({
        message: "Email not found",
      });
    } else {
      const checkPassword = bcrypt.compareSync(password, user.password);
      if (!checkPassword) {
        res.send({
          message: "Wrong Password",
        });
      } else {
        const accessToken = jwt.sign(
          {
            id: user.id,
            email: user.email,
            role: user.role,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "1d",
          }
        );
        const refreshToken = jwt.sign(
          {
            id: user.id,
            email: user.email,
            role: user.role,
          },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: "7d",
          }
        );
        await User.update(
          { refresh_token: refreshToken },
          {
            where: {
              id: user.id,
            },
          }
        );
        res.send({
          message: "Login Success",
          data: {
            email,
            accessToken,
            refreshToken,
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

//whoami
whoami = async (req, res) => {
  res.status(200).json(req.user);
};

//logout user
logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const user = await User.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!user) {
      res.send({
        message: "Refresh Token not found",
      });
    } else {
      const refreshToken = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "7d",
        }
      );
      await User.update(
        { refresh_token: null },
        {
          where: {
            id: user.id,
          },
        }
      );
      //res.clearCookie("refreshToken");
      res.send({
        message: "Logout Success",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllUsers,
  register,
  login,
  logout,
  registerAdmin,
  whoami,
};
