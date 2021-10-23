const mongoose = require('mongoose');
// const url = 'mongodb://localhost:27017/Project';
const url = 'mongodb+srv://SurajitD:SurajitD@cluster0.ynsbr.mongodb.net/react?retryWrites=true&w=majority';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('NODEJS TO MongoDB Connection ESTABLISH.....');
  })
  .catch(err => {
    console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
    process.exit();
  });
module.exports = mongoose;
