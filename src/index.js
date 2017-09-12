const mongoose = require('mongoose');
const app = require('./app');
require('env2')('./config.env');

mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('connected to database');
  app.listen(app.get('port'), () => {
    console.log('It\'s hard to explain puns to kleptomaniacs - they always take things literally');
  });
});
