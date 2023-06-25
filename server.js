require('dotenv').config();
const express = require('express');
const db = require('./config/connection');
const PORT = process.env.PORT || 3000;
const routes = require('./routes');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true })); // req.body
app.use(express.json());

// Connect to MongoDB, then Server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`App is listening on localhost port: ${PORT}`);
  });
});

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

app.use(routes);

module.exports = app;
