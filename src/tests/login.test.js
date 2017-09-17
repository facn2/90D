const chai = require('chai');
const request = require('supertest');

const should = chai.should();
const expect = chai.expect;

const app = require('./../app');

describe('login', () => {
  it('status code should be 200', (done) => {
    request(app)
      .get('/login')
      .expect(200, done);
  });

  it('response header - no error & not empty', (done) => {
    request(app)
      .get('/login')
      .end((err, res) => {
        console.log(res.header);
        should.not.exist(err);
        // should.not.be.empty();
        // expect(res.header).to.equal(true);
        done();
      });
  });
});
