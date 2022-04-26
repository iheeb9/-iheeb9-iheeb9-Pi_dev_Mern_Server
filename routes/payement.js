const express = require("express");
var router = express.Router();
const secret_key = process.env.PUBLIC_KEY
const stripe = require('stripe')("sk_test_51KoSyaBSBzdg4Hx8TrtsJ4aOQbSkd8m7cy6Smxh93NRtnEDOP7efFmeKXdBvXEQ5Qjouze5eHgl6XIKT5CWRBSL900JTR0LBzJ")
const cors = require("cors")
const auth = require('../middleware/auth')


router.post("/p", cors(), async (req, res) => {
	let { amount, id} = req.body
	
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			description: "Spatula company",
			payment_method: id,
			confirm: true,
			
		})
		// console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})

module.exports = router