import express from "express";
import mongoose from "mongoose";
import { userModel } from "./model.js";
import cors from "cors";
import bubbleRoute from "./bubble.js"
import pestleRoute from "./pestle.js"
import barRoute from "./bar.js";
import radarRoute from "./radar.js";
import boxplotRoute from "./boxplot.js";
import dotenv from "dotenv"
dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected"))
  .catch(() => console.log("error connecting"));

app.use("/chart/bubble",bubbleRoute)
app.use("/chart/pestle", pestleRoute);
app.use("/chart/bar", barRoute);
app.use("/chart/radar", radarRoute);
app.use("/chart/boxplot", boxplotRoute);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
