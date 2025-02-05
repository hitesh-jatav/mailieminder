const mongoose = require("mongoose");

const DB_NAME = process.env.DB_NAME; // e.g., 'myDatabase'
const DB_CLUSTER = process.env.DATABASE_CLUSTER; // e.g., 'mongodb+srv://<username>:<password>@binarybulletin.ihr36.mongodb.net'
const DB_URL = process.env.DB_URL;
// Construct the full connection URI
let connectionString = `${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority&appName=Binarybulletin`;
// let connectionString = `${DB_URL}/${DB_NAME}`;

mongoose
  .connect(connectionString, {
    connectTimeoutMS: 30000, // 30 seconds
    socketTimeoutMS: 45000, // 45 seconds
  })
  .then(() => {
    console.log("CONNECTION TO THE DATABASE SUCCESSFUL: " + DB_NAME);
  })
  .catch((err) => {
    console.log("ERROR WHILE CONNECTING TO DATABASE: " + err);
  });
