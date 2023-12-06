import express from "express";
import { userModel } from "./model.js";
const router = express.Router();

router.get("/", (req, res) => {
  userModel
    .find({})
    .then((data) => {
      const sectorCounts = {};
      for (const obj of data) {
        const sector = obj.sector;
        if (sectorCounts[sector]) {
          sectorCounts[sector]++;
        } else {
          sectorCounts[sector] = 1;
        }
      }
      const sectorCountsArray = Object.entries(sectorCounts).map(
        ([sector, count]) => {
          return { sector, count };
        }
      );
      res.send(sectorCountsArray);
    })
    .catch(function (err) {
      console.log(err);
    });
});

export default router;
