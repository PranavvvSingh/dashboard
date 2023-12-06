import express from "express";
import { userModel } from "./model.js";
const router = express.Router();

router.get("/", function (req, res) {
  userModel
    .find({ pestle: req.query.pestle })
    .exec()
    .then(function (data) {
      const fieldsToAverage = ["intensity", "likelihood", "relevance"];
      const result = fieldsToAverage.map((fieldName) => {
        const sum = data.reduce((acc, obj) => acc + obj[fieldName], 0);
        const average = sum / data.length;
        return { name: fieldName, average };
      });
      res.send(result);
    })
    .catch(function (err) {
      console.log(err);
    });
});

export default router
