const express = require("express");
const addAuction = require("../services/auction/addAuction");
const authMiddleware = require("../middleware/auth");
const getAuction = require("../services/auction/getAuction");
const getAvailableAuctions = require("../services/auction/getAvailableAuctions");
const placeAuctionBid = require("../services/auction/placeAuctionBid");

const router = express.Router();

// router.post("/", authMiddleware, addAuction);
router.post("/", addAuction);
router.get("/available", getAvailableAuctions);
router.get("/:id", getAuction);
router.post("/bid/place", authMiddleware, placeAuctionBid);
module.exports = router;
