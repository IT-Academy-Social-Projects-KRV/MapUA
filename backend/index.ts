import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";

import router from "./routes";
// import swaggerUI from "swagger-ui-express";
// import swDocument from "./openapi";
import "./config/db";

const app = express();

// https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// TODO: Change asterisc for something more particular
app.use(cors({ credentials: true, origin: "*" }));

// routes middleware
app.use("/api", router);

// TODO: ADD SWAGGER
// swagger
// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swDocument));

// turn on the server
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
