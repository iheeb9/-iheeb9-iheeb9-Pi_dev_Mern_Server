const Auction = require("../../models/Auction");
const AuctionProduct = require("../../models/AuctionProduct");

async function addAuction(req, res) {
  const { product } = req.body;
  const auctionProduct = new AuctionProduct({
    name: product.name,
    image: product.image,
    description: product.description,
    price: product.price,
  });

  try {
    const createdProduct = await auctionProduct.save();
    if (!createdProduct._id) {
      throw "createdProduct has no _id attribute";
    }

    const auction = new Auction({
      product: createdProduct._id,
      basePrice: product.price,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
    });
    const createdAuction = await auction.save();

    res.json(" Auction  :" + createdAuction + " added");
  } catch (err) {
    console.error("Error adding auction", err);
    res.status(500).send({ message: "Couldn't add Auction" });
  }
}

module.exports = addAuction;

/** Request body example 
{
    "product": {
        "name": "Test 1",
        "image": "bl;a afsadfa",
        "description": "bla bla",
        "price": 15
    },
    "startTime": null,
    "endTime": null,
}
*/
