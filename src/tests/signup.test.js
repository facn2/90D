const chai = require('chai');
const request = require('supertest');

const should = chai.should();
const expect = chai.expect;

const app = require('./../app');

describe('signup', () => {
  it('status code', (done) => {
    request(app)
      .get('/signup')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
  it('response header', (done) => {
    request(app)
      .get('/signup')
      .end((err, res) => {
        should.not.exist(err);
        expect(res.headers).to.be.an('object').to.have.any.keys('content-type', 'content-length', 'etag', 'date', 'connection');
        expect(res.headers['content-type']).to.be.equal('text/html; charset=utf-8');
        done();
      });
  });
  it('response text', (done) => {
    request(app)
      .get('/signup')
      .end((err, res) => {
        should.not.exist(err);
        expect(res.text).to.be.an('string').to.include('<title>90 Days</title>');
        done();
      });
  });
  it('response body', (done) => {
    request(app)
      .get('/signup')
      .end((err, res) => {
        should.not.exist(err);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
