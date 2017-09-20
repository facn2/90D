const chai = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');
const { Goal } = require('.././database/goal_schema');

const should = chai.should();
const expect = chai.expect;

mongoose.connect('mongodb://localhost/testingninety', {
  useMongoClient: true
});

const db = mongoose.connection;
mongoose.Promise = global.Promise;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  const app = require('./../app');

  const newGoal = {
    goal90: 'inner peace',
    dailyGoal: 'meditate',
    description: 'find some peace',
    reward: 'you are a better person',
    endDate: new Date()
  };

  describe('add goal', () => {
    it('should have a status code 301', (done) => {
      request(app)
      .post('/addGoal');
      expect('status code', 301);
      done();
    });
    it('should insert new goal to database', (done) => {
      request(app)
      .post('/addGoal')
      .set('Cookie', 'user_email=matt@king')
      .type('json')
      .send(newGoal)
      .end((err, res) => {
        should.not.exist(err);
        Goal.find({'owner': 'matt@king'}, (err, result) => {
          if (err) {
            console.log('Error testing find new user: ', err);
            done();
          }
          expect(result).to.be.an('array');
          expect(result[0]).to.be.an('object');
          expect(result[0].owner).to.be.equal('matt@king');
          expect(result[0].goal90).to.be.equal('inner peace');
          expect(result[0].dailyGoal).to.be.equal('meditate');
          expect(result[0].description).to.be.equal('find some peace');
          expect(result[0].reward).to.be.equal('you are a better person');
          done();
        });
      });
    });
  });
  after(() => {
    db.dropDatabase();
  });
});
