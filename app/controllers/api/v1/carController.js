const { Cars } = require("../../../models");
const { User } = require("../../../models");

//get all cars
getAllCars = async (req, res) => {
  try {
    if (req.user.role === "superadmin" || req.user.role === "admin") {
      const cars = await Cars.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.send({
        message: "Response Success",
        data: {
          cars,
        },
      });
    } else {
      res.status(401).json({
        message: "Unauthorized, you need permission from  admin atau superadmin",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//get one car
getOneCar = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user.role === "superadmin" || req.user.role === "admin") {
      const car = await Cars.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.send({
        message: "Response Success",
        data: {
          car,
        },
      });
    } else {
      res.status(401).json({
        message: "Unauthorized, you need permission from  admin atau superadmin",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//get available car
getAvailableCar = async (req, res) => {
  try {
    const { availability } = req.params;

    const cars = await Cars.findAll({
      where: {
        availability,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      message: "Response Success",
      data: {
        cars,
        availability,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

//create cars
createCars = async (req, res) => {
  try {
    const { name, rentprice, size, description, availability } = req.body;
    const datauser = req.user.email;
    if (req.user.role === "superadmin" || req.user.role === "admin") {
      const createdBy = await User.findOne({
        where: {
          email: datauser,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "password", "refresh_token", "id"],
        },
      });
      const cars = await Cars.create({
        name,
        rentprice,
        size,
        description,
        availability,
      });
      res.send({
        message: "Data Added Successfully",
        data: {
          cars,
          createdBy,
        },
      });
    } else {
      res.status(401).json({
        message: "Unauthorized, you need permission from  admin atau superadmin",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//update cars
updateCars = async (req, res) => {
  try {
    const { id } = req.params;
    const datauser = req.user.email;
    const { name, rentprice, size, description, availability } = req.body;
    if (req.user.role === "superadmin" || req.user.role === "admin") {
      const updatedBy = await User.findOne({
        where: {
          email: datauser,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "password", "refresh_token", "id"],
        },
      });
      const cars = await Cars.update(
        {
          name,
          rentprice,
          size,
          description,
          availability,
        },
        {
          where: {
            id,
          },
        }
      );
      res.send({
        message: "Response Success",
        data: {
          name,
          rentprice,
          size,
          description,
          availability,
          updatedBy,
        },
      });
    } else {
      res.status(401).json({
        message: "Unauthorized, you need permission from  admin atau superadmin",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//delete cars
deleteCars = async (req, res) => {
  try {
    const { id } = req.params;
    const datauser = req.user.email;
    if (req.user.role === "superadmin" || req.user.role === "admin") {
      const deletedBy = await User.findOne({
        where: {
          email: datauser,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "password", "refresh_token", "id"],
        },
      });
      const cars = await Cars.destroy({
        where: {
          id,
        },
      });
      res.send({
        message: "Data Deleted Successfully",
        data: {
          cars,
          deletedBy,
        },
      });
    } else {
      res.status(401).json({
        message: "Unauthorized, you need permission from  admin atau superadmin",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllCars,
  getOneCar,
  createCars,
  updateCars,
  deleteCars,
  getAvailableCar,
};
