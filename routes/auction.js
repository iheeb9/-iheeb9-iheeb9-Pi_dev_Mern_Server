var express = require("express");
var addAuction = require("../services/auction/addAuction");
const getAuction = require("../services/auction/getAuction");
const getAvailableAuctions = require("../services/auction/getAvailableAuctions");

const router = express.Router();

router.post("/", addAuction);
router.get("/available", getAvailableAuctions);
router.get("/:id", getAuction);

module.exports = router;
