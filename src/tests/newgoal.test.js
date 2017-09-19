const chai = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');
const { Users } = require('.././database/user_schema');

const should = chai.should();
const expect = chai.expect;

let cookie;

mongoose.connect('mongodb://localhost/testingninety', {
  useMongoClient: true
});

const db = mongoose.connection;
mongoose.Promise = global.Promise;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  const app = require('./../app');

  const loginData = {
    email: 'matt@king',
    password: 'kingmatt'
  };

  const newUser = new Users({
    firstName: 'Matt',
    lastName: 'King',
    email: 'matt@king',
    password: '$2a$10$RrRCOtzEExCVSfD6rT6ZWOSK8eeo3STeit2XfbnFlQU0Eq45V5Ktm'
  });

  newUser.save((err) => {
    if (err) {
      console.log('Error saving newUser to db');
    } else {
      describe('new goal', () => {
        it('login to receive cookies', (done) => {
          request(app)
          .post('/validateLogin')
          .type('json')
          .send(loginData)
          .end((err, res) => {
            should.not.exist(err);
            cookie = res.headers['set-cookie'][0];
            done();
          });
        });
        it('headers from newGoal', (done) => {
          request(app)
          .get('/newGoal')
          .set('Cookie', cookie)
          .end((err, res) => {
            should.not.exist(err);
            if (err) console.log(err);
            expect(res.headers['set-cookie'][0]).to.be.equal('user_email=matt@king');
            done();
          });
        });
        it('should have an empty body', (done) => {
          request(app)
          .get('/newGoal')
          .set('Cookie', cookie)
          .end((err, res) => {
            should.not.exist(err);
            if (err) console.log(err);
            expect(res.body).to.be.empty.to.be.an('object');
            done();
          });
        });
      });
    }
  });
});
