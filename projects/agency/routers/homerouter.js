const home = require("../views/homeview");

const express = require("express");

const router = express.Router();

router.route("/").get(home);

module.exports = router;
