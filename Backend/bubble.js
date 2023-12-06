import express from "express";
import { userModel } from "./model.js";
const router = express.Router();

router.get("/", (req, res) => {
  const reg = req.query.region;
  const cou = req.query.country;
  if (reg && cou) {
    userModel
      .find({ region: reg, country: cou })
      .exec()
      .then((data) => {
        res.send(data);
      })
      .catch(function (err) {
        console.log(err);
      });
  } else if (reg) {
    userModel
      .find({ region: reg })
      .exec()
      .then((data) => {
        res.send(data);
      })
      .catch(function (err) {
        console.log(err);
      });
  } else if (cou) {
    userModel
      .find({ country: cou })
      .exec()
      .then((data) => {
        res.send(data);
      })
      .catch(function (err) {
        console.log(err);
      });
  } else {
    userModel
      .find({})
      .exec()
      .then((data) => {
        res.send(data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }
});

export default router