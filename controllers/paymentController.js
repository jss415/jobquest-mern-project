import Stripe from "stripe";
import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";

export const getCheckoutSession = async (req, res, next) => {
  const { credits, price } = req.body;

  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_SITE_URL}/dashboard`,
      cancel_url: `${process.env.CLIENT_SITE_URL}/dashboard`,
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: price * 100,
            product_data: {
              name: `${credits}`,
              description: `Purchase ${credits} for ${price} USD`,
            },
          },
          quantity: 1,
        },
      ],
    });

    res.status(StatusCodes.OK).json({ session });
  } catch (err) {
    console.error("Error creating checkout session:", err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong" });
  }
};
