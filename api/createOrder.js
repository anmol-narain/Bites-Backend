// api/createOrder.js
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req, res) {
  console.log("Incoming method:", req.method);

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Origin", "https://biteschocolatedelights.netlify.app");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    console.log("❌ Method not allowed");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  res.setHeader("Access-Control-Allow-Origin", "https://biteschocolatedelights.netlify.app");
  res.setHeader("Access-Control-Allow-Credentials", true);

  try {
    console.log("Environment check:");
    console.log("KEY_ID", process.env.RAZORPAY_KEY_ID ? "Loaded ✅" : "Missing ❌");

    console.log("Request body:", req.body);

    const { amount, currency, receipt } = req.body;

    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt,
    });

    console.log("✅ Order created:", order);

    return res.status(200).json(order);
  } catch (error) {
    console.error("🔥 Error creating Razorpay order:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}