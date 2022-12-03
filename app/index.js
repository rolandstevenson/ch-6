const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const router = require("../config/routes");

const app = express();

dotenv.config();
/** Install request logger */
app.use(morgan("dev"));
app.use(cookieParser());
/** Install JSON request parser */
app.use(express.json());

/** Install Router */
app.use(router);

module.exports = app;
