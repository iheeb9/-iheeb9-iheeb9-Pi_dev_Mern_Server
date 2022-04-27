const mongoose = require("mongoose");

const AuctionProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  images:{
    type: Array,
    required: true
},
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("AuctionProduct", AuctionProductSchema);
