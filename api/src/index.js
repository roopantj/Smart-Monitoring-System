import express from "express";
import cors from "cors";
import alertRoute from "./Alert/alert.route.js";
import cameraConfigRoute from "./CamConfig/camConfig.route.js";
import { mongoConnect } from "./Mongoose/connect.service.js";
import "dotenv/config";

const app = express();

// Handling CORS
const corsOption = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOption));

// Parsing Request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Welcome API
app.get("/", (req, res, next) => {
  res.send("Status : HEALTHY");
});

app.use("/alert", alertRoute);
app.use("/cameraConfig", cameraConfigRoute);

await mongoConnect(() => {
  app.listen(3000, () => {
    console.log("Server started at PORT 3000");
  });
});

export default app;
