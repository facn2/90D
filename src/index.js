const mongoose = require('mongoose');
const app = require('./app');
require('env2')('./config.env');
const CronJob = require('cron').CronJob;
const { Goal } = require('./database/goal_schema');

mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true
});

const db = mongoose.connection;
mongoose.Promise = global.Promise;

const job = new CronJob('00 00 00 * * *', () => {
  Goal.updateMany({ }, {'dailyCheck': false}, (err, result) => {
    if (err) {
      console.log('Database update failed');
    }
  });
}, null, true);

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('connected to database');
  job.start();
  app.listen(app.get('port'), () => {
    console.log('It\'s hard to explain puns to kleptomaniacs - they always take things literally');
  });
});
