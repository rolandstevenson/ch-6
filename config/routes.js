const express = require("express");
const controllers = require("../app/controllers");
const verifyToken = require("../app/middleware/verifyToken.js");
const apiRouter = express.Router();
const path = require("path");

const app = express();

app.use(verifyToken);

//main page api
apiRouter.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../views/index.html"));
});

//users api
apiRouter.get(
  "/api/v1/whoami",
  verifyToken,
  controllers.api.v1.userController.whoami
);

apiRouter.get(
  "/api/v1/users",
  verifyToken,
  controllers.api.v1.userController.getAllUsers
);

apiRouter.post("/api/v1/register", controllers.api.v1.userController.register);
apiRouter.post(
  "/api/v1/registeradmin",
  verifyToken,
  controllers.api.v1.userController.registerAdmin
);
apiRouter.post("/api/v1/login", controllers.api.v1.userController.login);
apiRouter.delete("/api/v1/logout", controllers.api.v1.userController.logout);

//cars api
apiRouter.get(
  "/api/v1/cars",
  verifyToken,
  controllers.api.v1.carController.getAllCars
);
apiRouter.get(
  "/api/v1/car/:id",
  verifyToken,
  controllers.api.v1.carController.getOneCar
);
apiRouter.get(
  "/api/v1/car/available/:availability",
  controllers.api.v1.carController.getAvailableCar
);
apiRouter.post(
  "/api/v1/car/add",
  verifyToken,
  controllers.api.v1.carController.createCars
);
apiRouter.put(
  "/api/v1/car/edit/:id",
  verifyToken,
  controllers.api.v1.carController.updateCars
);
apiRouter.delete(
  "/api/v1/car/delete/:id",
  verifyToken,
  controllers.api.v1.carController.deleteCars
);

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
