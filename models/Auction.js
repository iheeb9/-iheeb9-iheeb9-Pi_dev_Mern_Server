const mongoose = require("mongoose");
const types = mongoose.Types;

const AuctionSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AuctionProduct",
      required: true,
    },
    basePrice: {
      type: types.Decimal128,
      required: true,
    },
    currentPrice: {
      type: types.Decimal128,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      require: true,
    },
    soldAt: {
      type: Date,
    },
    auctionStarted: {
      type: Boolean,
      default: false,
    },
    auctionEnded: {
      type: Boolean,
      default: false,
    },
    sold: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: types.ObjectId,
      ref: "user",
    },
    purchasedBy: {
      type: types.ObjectId,
      ref: "user",
    },
    currentBidder: {
      type: types.ObjectId,
      ref: "user",
    },
    bids: [
      {
        user: {
          type: types.ObjectId,
          ref: "user",
         required: true,  
        },
        amount: {
          type: types.Decimal128,
          required: true,
        },
        time: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    room: {
      type: types.ObjectId,
      ref: "room",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Auction", AuctionSchema);
