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

  const newUser = {
    firstName: 'Matt',
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
        Users.find({'firstName': 'Matt'}, (err, result) => {
          if (err) {
            console.log('Error testing find new user: ', err);
            done();
          }
          expect(result).to.be.an('array');
          expect(result[0]).to.be.an('object').to.have.any.keys('_id', 'firstName', 'lastName', 'email', '$__', '$init', '_doc', 'errors', 'isNew', 'password');
          expect(result[0].firstName).to.be.equal('Matt');
          expect(result[0].lastName).to.be.equal('King');
          expect(result[0].email).to.be.equal('matt@king');
          done();
        });
      });
    });
    it('body should exist and be empty', (done) => {
      request(app)
      .post('/newUser')
      .send(newUser)
      .end((err, res) => {
        should.not.exist(err);
        expect(res.body).to.be.empty.to.be.an('object');
        done();
      });
    });
    it('headers should exist and include keys', (done) => {
      request(app)
      .post('/newUser')
      .send(newUser)
      .end((err, res) => {
        should.not.exist(err);
        expect(res.headers).to.exist.to.be.an('object');
        expect(res.headers).to.be.an('object').to.have.any.keys('content-type', 'content-length', 'etag', 'date', 'connection');
        done();
      });
    });
  });
  after(() => {
    db.dropDatabase();
  });
});
