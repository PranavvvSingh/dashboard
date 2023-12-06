import express from "express";
import { userModel } from "./model.js";
const router = express.Router();

router.get("/", (req, res) => {
  userModel
    .find({})
    .then((data) => {
      const pestleCounts = {};
      for (const obj of data) {
        const pestle = obj.pestle;
        if (pestleCounts[pestle]) {
          pestleCounts[pestle]++;
        } else {
          pestleCounts[pestle] = 1;
        }
      }
      const pestleCountsArray = Object.entries(pestleCounts).map(
        ([pestle, count]) => {
          return {pestle, count,};
        }
      );
      res.send(pestleCountsArray);
    })
    .catch(function (err) {
      console.log(err);
    });
});

export default router
