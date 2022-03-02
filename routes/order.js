var express = require('express');

const orders = require('../models/Orders');
const Orders = require('../models/Orders');


var router = express.Router();
router.post('/', function (req, res, next) {
    new orders({ isPaid: req.body.isPaid }).save(
        (err, neworders) => {
            if (err)
                console.log("error message :" + err);
            else {
                console.log(neworders);

                res.json(" : orders :" + neworders + " added");

            }
        })
});
router.post(
    '/add',

    async (req, res) => {
        if (req.body.orderItems.length === 0) {
            res.status(400).send({ message: 'Cart is empty' });
        } else {
            const order = new orders({
                seller: req.body.orderItems[0].seller,
                orderItems: req.body.orderItems,
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod,
                itemsPrice: req.body.itemsPrice,
                shippingPrice: req.body.shippingPrice,
                taxPrice: req.body.taxPrice,
                totalPrice: req.body.totalPrice,
            });
            const createdOrder = await order.save();
            res
                .status(201)
                .send({ message: 'New Order Created', order: createdOrder });
        }
    });


router.get('/', function (req, res, next) {
    orders.find(
        (error, orders) => {
            console.log(orders);
            console.log("yesss");

            res.json(" : orders :" + orders);


        }
    );

});
module.exports = router;

