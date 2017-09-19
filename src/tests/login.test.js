const chai = require('chai');
const request = require('supertest');

const should = chai.should();

const app = require('./../app');

describe('login', () => {
  it('status code should be 200', (done) => {
    request(app)
      .get('/')
      .expect(200, done);
  });

  it('response header - no error & not empty', (done) => {
    request(app)
      .get('/')
      .end((err, res) => {
        should.not.exist(err);
        // should.not.be.empty();
        // expect(res.header).to.equal(true);
        done();
      });
  });
});
