// set environment to test
process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const request = require('supertest');
const chaiSubset = require('chai-subset');

// load note model
const Gym = require('../models/Gym');

chai.use(chaiHttp);
chai.use(chaiSubset);

const userCredentials = {
  email: 'testas431@yahoo.com',
  password: 'testas43'
};

let token;
const authenticatedUser = request.agent(server);

let gymId;
let gymReviewId;

describe('Gyms', () => {
  before((done) => {
    authenticatedUser
      .post('/api/v1/users/login')
      .send(userCredentials)
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        expect(res.body).to.have.property('token');
        expect(res.statusCode).to.equal(200);
        token = res.body.token;
        done();
      });
  }, (done) => {
    Gym.deleteMany({}, (err) => {
      console.log(err);
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
        .set('Authorization', token)
        .send({ name: 'test', city: 'test1', description: 'test', website: 'test1' })
        .end((err, res) => {
          if (err) {
            console.log(err);
          }
          expect(res).to.have.status(201);
          expect(res.body.name).to.be.equal('test');
          gymId = res.body._id;
          done();
        });
    });
  });

  describe('/PUT gym', () => {
    it('it should update gym', (done) => {
      chai.request(server)
        .put('/api/v1/gyms/' + gymId)
        .set('Authorization', token)
        .send({ name: 'testas', city: 'test1', description: 'test', website: 'test1' })
        .end((err, res) => {
          if (err) {
            console.log(err);
          }
          expect(res).to.have.status(201);
          expect(res.body.name).to.be.equal('testas');
          done();
        });
    });
  });

  describe('/GET gym by id', () => {
    it('it should get one gym by id', (done) => {
      chai.request(server)
        .get('/api/v1/gyms/' + gymId)
        .end((err, res) => {
          if (err) {
            console.log(err);
          }
          expect(res).to.have.status(200);
          expect(res.body.name).to.be.equal('testas');
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

  // reviews
  describe('/POST gym review', () => {
    it('it should post 1 gym review to specific gym', (done) => {
      chai.request(server)
        .post('/api/v1/gyms/' + gymId + '/reviews')
        .set('Authorization', token)
        .send({ text: 'testreview' })
        .end((err, res) => {
          if (err) {
            console.log(err);
          }
          expect(res).to.have.status(201);
          expect(res.body.reviews).to.containSubset([{text: 'testreview'}]);
          let review = res.body.reviews.find(review => {
            return review.text.toString() === 'testreview';
          });
          gymReviewId = review._id;
          done();
        });
    });
  });

  describe('/PUT gym review', () => {
    it('it should put gym review to specific gym', (done) => {
      chai.request(server)
        .put('/api/v1/gyms/' + gymId + '/reviews/' + gymReviewId)
        .set('Authorization', token)
        .send({ text: 'testreviewa' })
        .end((err, res) => {
          if (err) {
            console.log(err);
          }
          expect(res).to.have.status(201);
          expect(res.body.reviews).to.containSubset([{text: 'testreviewa'}]);
          done();
        });
    });
  });

  describe('/DELETE gym review', () => {
    it('it should delete gym review in specific gym', (done) => {
      chai.request(server)
        .delete('/api/v1/gyms/' + gymId + '/reviews/' + gymReviewId)
        .set('Authorization', token)
        .end((err, res) => {
          if (err) {
            console.log(err);
          }
          expect(res).to.have.status(200);
          expect(res.body.reviews).not.to.containSubset([{_id: gymReviewId}]);
          done();
        });
    });
  });

  describe('/DELETE gym review (not found)', () => {
    it('it should not find gym review in specific gym', (done) => {
      chai.request(server)
        .delete('/api/v1/gyms/' + gymId + '/reviews/' + 'wrongreview')
        .set('Authorization', token)
        .end((err, res) => {
          if (err) {
            console.log(err);
          }
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  // GYM deleting
  describe('/DELETE gym by id', () => {
    it('it should delete gym by id', (done) => {
      chai.request(server)
        .delete('/api/v1/gyms/' + gymId)
        .set('Authorization', token)
        .end((err, res) => {
          if (err) {
            console.log(err);
          }
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success');
          done();
        });
    });
  });

  describe('/DELETE gym by id (not found)', () => {
    it('it should respond with not found when deleting gym with wrong id', (done) => {
      chai.request(server)
        .delete('/api/v1/gyms/' + 'wrongid')
        .set('Authorization', token)
        .end((err, res) => {
          if (err) {
            console.log(err);
          }
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});
