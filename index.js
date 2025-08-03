// index.js
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Basic test route
app.get("/", (req, res) => {
  res.send("Razorpay backend is working!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});