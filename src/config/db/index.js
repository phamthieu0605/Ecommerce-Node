const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect('mongodb://localhost/ecommerce_01', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log(`Connected to MongoDB`)
  } catch(err) {
    console.log(err)
  }
}

module.exports = { connect }
