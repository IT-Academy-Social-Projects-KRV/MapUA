import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";

import router from "./routes";
// swagger
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
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

// swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "MapUA API",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: ["./routes/index.ts"],
};

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
