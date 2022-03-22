const Auction = require("../../models/Auction");

async function placeAuctionBid(req, res) {
  const user = req.user;
  const { auctionId, amount } = req.body;

  // find auction
  let auction;
  try {
    auction = await Auction.findById(auctionId);
  } catch (error) {
    console.error(error);
    return res.status(404).send({ message: "Couldn't find Auction" });
  }

  // validation
  //   if (!(auction.auctionStarted && !auction.auctionEnded)) {
  //     res.status(400).send({ message: "Auction is not available" });
  //   }

  if (amount <= auction.currentPrice) {
    return res
      .status(400)
      .send({ message: "Can't bid a lower price than current price" });
  }

  // place bid
  const bid = {
    user: user._id,
    amount,
    time: new Date(),
  };

  // insert bid in auction.bids
  auction.bids.unshift(bid);
  // update current bidder
  auction.currentBidder = user._id;
  // update current price
  auction.currentPrice = amount;

  try {
    // save to db
    const result = await auction.save();
    res.json(result);
  } catch (error) {
    res.status(500).send({ message: "Couldn't place Auction bid" });
  }
}

module.exports = placeAuctionBid;

/**
 * {
 *      "auctionId": "xxxx-xxxxx-xxxxx",
 *      "amount": 10.0,
 * }
 */
