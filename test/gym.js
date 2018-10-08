// set environment to test
process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

// load note model
const Gym = require('../models/Gym');

chai.use(chaiHttp);

describe('Gyms', () => {
  beforeEach((done) => {
    Gym.deleteMany({}, (err) => {
      if (err) console.log(err);
      done();
    });
  });

  describe('/GET all gyms', () => {
    it('it should get all gyms', (done) => {
      chai.request(server)
        .get('/api/v1/gyms')
        .end((err, res) => {
          if (err) {
            console.log(err);
          }
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('array');
          done();
        });
    });
  });

  describe('/POST gym', () => {
    it('it should post 1 gym with valid data', (done) => {
      chai.request(server)
        .post('/api/v1/gyms')
        .send({ name: 'test', city: 'test1' })
        .end((err, res) => {
          if (err) {
            console.log(err);
          }
          expect(res).to.have.status(201);
          expect(res.body.name).to.be.equal('test');
          done();
        });
    });
  });

  describe('/POST gym (with errors)', () => {
    it('it should not create new gym', (done) => {
      chai.request(server)
        .post('/api/v1/gyms')
        .send({ name: '', city: '' })
        .end((err, res) => {
          if (err) {
            console.log(err);
          }
          expect(res).to.have.status(401);
          done();
        });
    });
  });
});
