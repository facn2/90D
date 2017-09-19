const chai = require('chai');
const request = require('supertest');

const should = chai.should();
const expect = chai.expect;

const app = require('./../app');

describe('login', () => {
  it('status code should be 200', (done) => {
    request(app)
      .get('/')
      .expect(200, done);
  });
  it('response header should have keys', (done) => {
    request(app)
      .get('/')
      .end((err, res) => {
        should.not.exist(err);
        expect(res.headers).to.be.an('object').to.have.any.keys('content-type', 'content-length', 'etag', 'date', 'connection');
        done();
      });
  });
  it('response text', (done) => {
    request(app)
      .get('/')
      .end((err, res) => {
        should.not.exist(err);
        expect(res.text).to.be.an('string').to.include('<label for="email" class="clip">Email</label>');
        done();
      });
  });
  it('response body', (done) => {
    request(app)
      .get('/')
      .end((err, res) => {
        should.not.exist(err);
        expect(res.body).to.be.empty.to.be.an('object');
        done();
      });
  });
});
