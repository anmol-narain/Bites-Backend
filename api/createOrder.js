// api/createOrder.js

import Razorpay from "razorpay";

console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID ? "Loaded ✅" : "Missing ❌");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://biteschocolatedelights.netlify.app"
    );
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://biteschocolatedelights.netlify.app"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  try {
    // Ensure body parsing (Vercel sometimes requires manual parsing)
    const { amount, currency = "INR", receipt = "receipt#1" } =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const order = await razorpay.orders.create({
      amount, // amount in paise
      currency,
      receipt,
    });

    return res.status(200).json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}