// Ask Copilot to build a simple API server
// Import the required modules
const express = require("express");
const bodyParser = require("body-parser");

// Set up the Express application
const app = express();
app.use(bodyParser.json());

// Define a route to handle the API request
app.post("/count-characters", (req, res) => {
  const { text } = req.body;
  if (typeof text !== "string") {
    return res.status(400).json({ error: "Invalid input" });
  }
  const characterCount = text.length;
  res.json({ characterCount });
});

// Start the server and listen on a specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
