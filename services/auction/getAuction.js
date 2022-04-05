const Auction = require("../../models/Auction");

async function getAuction(req, res) {
  const id = req.params.id;
  try {
    const result = await Auction.findById(id)
      .populate("product")
      .populate("bids.user");
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Couldn't find Auction" });
  }
}

module.exports = getAuction;
