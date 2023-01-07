const express = require("express");

const {
  createAdmin,
  getAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../views/adminView");

const router = express.Router();

router.route("/create/").post(createAdmin);
router.route("/getAll/").get(getAdmins);
router.route("/get/").get(getAdmin);
router.route("/update/").post(updateAdmin);
router.route("/delete/").get(deleteAdmin);

module.exports = router;
