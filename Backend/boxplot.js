import express from "express";
import { userModel } from "./model.js";
const router = express.Router();

router.get("/", (req, res) => {
  userModel
    .find({topic:req.query.topic})
    .exec()
    .then((data) => {
        res.send(data)
    })
    .catch(function (err) {
      console.log(err);
    });
});

export default router;