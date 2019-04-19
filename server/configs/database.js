const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI 

mongoose
  .connect("mongodb://localhost/katharina-rot", { useNewUrlParser: true })
  // .connect(uri, { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });