require("dotenv").config();
const express = require("express");
require("./config/db.config");

const app = express();
const PORT = process.env.PORT || 3000;
const { startCronJobs } = require("./jobs/schedules");

app.get("/", (req, res) => {
  res.send("✅ Node server with MongoDB cron job scheduler is running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  startCronJobs();
});

setInterval(() => {
  const currentTime = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
  console.log(`🕒 Current time in IST: ${currentTime}`);
}, 10000); // Logs the time every 10 seconds
