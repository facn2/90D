const chai = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');
const { Users } = require('.././database/user_schema');

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
      describe('validate login', () => {
        it('should have a status code 301', (done) => {
          request(app)
          .post('/validateLogin');
          expect('status code', 301);
          done();
        });
        it('headers should have a user_session cookie', (done) => {
          request(app)
          .post('/validateLogin')
          .type('json')
          .send(loginData)
          .end((err, res) => {
            should.not.exist(err);
            expect(res.headers).to.exist.to.have.any.keys('content-type', 'content-length', 'etag', 'date', 'connection', 'set-cookie');
            expect(res.headers['set-cookie']).to.be.an('array');
            expect(res.headers['set-cookie'][0]).to.be.equal('user_session=eyJhbGciOiJIUzI1NiJ9.bWF0dEBraW5n.qXIr2i8uAgK-ZGQQxXWPbCHHyZ_jVtkvxHoX1NBgnDA');
            done();
          });
        });
      });
      after(() => {
        db.dropDatabase();
      });
    }
  });
});
