const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(
  'mongodb+srv://tg1489:RUBYruby2808!!@cluster0.hr6x6af.mongodb.net/bootcamp-social-media-backend'
);

module.exports = mongoose.connection;
