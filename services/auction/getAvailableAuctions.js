const Auction = require("../../models/Auction");
const { DateTime } = require("luxon");

async function getAvailableAuctions(req, res) {
  const filter = {
    auctionEnded: false,
    startTime: { $lte: DateTime.now().plus({ hours: 01 }).toJSDate() }, // auction started or starts in one hour from now
    endTime: { $gte: DateTime.now().toJSDate() },
  };

  try {
    console.log("Finding auctions");
    const result = await Auction.find(filter) // find with filter
      .populate("product"); // add product details
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Couldn't find available Auctions" });
  }
}

module.exports = getAvailableAuctions;
