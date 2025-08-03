const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "https://biteschocolatedelights.netlify.app",
  methods: ["GET", "POST", "OPTIONS"]
}));
app.use(express.json());

app.post("/api/createOrder", async (req, res) => {
  const { amount, currency, receipt } = req.body;

  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  const options = {
    amount: Number(amount) * 100,
    currency: currency || "INR",
    receipt: receipt || "receipt#001",
    payment_capture: 1,
  };

  try {
    const order = await instance.orders.create(options);
    res.status(200).json(order);
  } catch (err) {
    console.error("Error creating Razorpay order:", err);
    res.status(500).json({ message: "Failed to create order" });
  }
});

app.get("/", (req, res) => {
  res.send("Razorpay backend is live 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});