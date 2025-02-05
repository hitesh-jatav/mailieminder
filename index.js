require("dotenv").config();
const express = require("express");
require("./config/db.config");

const app = express();
const PORT = process.env.PORT || 3000;
require("./jobs/schedules");

app.get("/", (req, res) => {
  res.send("✅ Node server with MongoDB cron job scheduler is running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Prevent instance inactivity by performing a simple task every minute
setInterval(() => {
  console.log("🔄 Server alive check executed");
  // This is where you could add any dummy operation, like database checks or logging
}, 60000); // Runs every 60 seconds (1 minute)
