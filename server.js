import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // For Node.js 18+, use: import fetch from "node-fetch";

const app = express();

app.use(cors()); // Enable CORS for all routes

app.get("/api/trending-quotes", async (req, res) => {
  try {
    const response = await fetch("https://www.brainyquote.com/topics/trends-quotes");
    const data = await response.json(); // BrainyQuote does not provide JSON, so we get HTML
    console.log("data : \n\n", data );
    res.send(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quotes" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
