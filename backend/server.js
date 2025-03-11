require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Route to Get Flight Data
app.get("/flights", async (req, res) => {
  try {
    const response = await axios.get("https://opensky-network.org/api/states/all");
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching flight data:", error);
    res.status(500).json({ error: "Failed to fetch flight data" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
