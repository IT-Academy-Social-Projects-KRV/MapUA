import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";
import busboy from "connect-busboy";

import router from "./routes";

import swaggerUI from "swagger-ui-express";
import "./config/db";
import passport from "./libs/passport";
import YAML from "yamljs";

const app = express();

// https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded
app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: false }));
app.use(
  busboy({
    highWaterMark: 200 * 1024, // Set 2MB buffer
    limits: {
      fileSize: 1024 * 1024, // 100Mb,
    },
  })
);
// TODO: Change asterisc for something more particular
app.use(cors({ credentials: true, origin: "*" }));

// routes middleware
app.use("/api", router);

// turn on the server
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// swagger
const swaggerDocument = YAML.load("./swagger-config.yml");
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
