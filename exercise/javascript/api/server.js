// server.js

const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Define the API endpoint
app.post("/count-characters", (req, res) => {
  const { inputString } = req.body;

  if (typeof inputString !== "string") {
    return res
      .status(400)
      .json({ error: "Invalid input. Please provide a string." });
  }

  const characterCount = inputString.length;
  res.json({ characterCount });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
