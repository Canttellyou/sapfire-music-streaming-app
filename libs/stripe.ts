import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2024-06-20",
  appInfo: {
    name: "Sapfire",
    version: "1.0.0",
  },
});
