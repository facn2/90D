const chai = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');
const { users } = require('.././database/user_schema');

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

  const newUser = {
    firstName: 'one',
    lastName: 'King',
    email: 'matt@king',
    password: 'kingmatt',
    confirmPassword: 'kingmatt'
  };

  describe('new user', () => {
    it('should have a status code 301', (done) => {
      request(app)
      .post('/newUser');
      expect('status code', 301);
      done();
    });
    it('data should be inserted in database', (done) => {
      request(app)
      .post('/newUser')
      .type('json')
      .send(newUser)
      .end((err, res) => {
        should.not.exist(err);
        users.find({'firstName': 'one'}, (err, result) => {
          if (err) console.log(err);
          console.log('This is the result: ', result);
        });
        should.exist(res.body);
        done();
      });
    });
  });
  after(() => {
    db.close();
  });
});
