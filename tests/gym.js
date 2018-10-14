// set environment to test
process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const request = require('supertest');
const chaiSubset = require('chai-subset');
const jwtDecode = require('jwt-decode');
// const faker = require('faker');

// load note model
const Gym = require('../models/Gym');

chai.use(chaiHttp);
chai.use(chaiSubset);

const userCredentials = {
  email: 'testas431@yahoo.com',
  password: 'testas43'
};

let token;
let userId;
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
        let decoded = jwtDecode(token);
        userId = decoded.id;
        done();
      });
  }, (done) => {
    Gym.deleteMany({}, (err) => {
      console.log(err);
      done();
    });
  }, (done) => {
    // populate with fake data
    // faker.seed(500);
    // const gym = new Gym({
    //   name: faker.name.findName(),
    //   city: faker.name.findName(),
    //   description: faker.name.findName(),
    //   website: faker.name.findName()
    // });

    // gym.save((err) => {
    //   if (err) console.log(err);
    // });
    // done();
  });

  describe('/POST gym', () => {
    it('it should post 1 gym with valid data', (done) => {
      chai.request(server)
        .post('/api/v1/gyms')
        .set('Authorization', token)
        .send({ name: 'test', city: 'test1kaunas', description: 'test', website: 'test1' })
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

  describe('/GET all gyms', () => {
    it('it should get all gyms', (done) => {
      chai.request(server)
        .get('/api/v1/gyms')
        .end((err, res) => {
          if (err) {
            console.log(err);
          }
          expect(res).to.have.status(200);
          expect(res.body.length).to.be.equal(16);
          expect(res.body).to.be.a('array');
          done();
        });
    });

    it('it should get first page gyms (12)', (done) => {
      chai.request(server)
        .get('/api/v1/gyms?page=1')
        .end((err, res) => {
          if (err) {
            console.log(err);
          }
          expect(res).to.have.status(200);
          expect(res.body.length).to.be.equal(12);
          expect(res.body).to.be.a('array');
          done();
        });
    });

    it('it should get second page gyms (3)', (done) => {
      chai.request(server)
        .get('/api/v1/gyms?page=2')
        .end((err, res) => {
          if (err) {
            console.log(err);
          }
          expect(res).to.have.status(200);
          expect(res.body.length).to.be.equal(4);
          expect(res.body).to.be.a('array');
          done();
        });
    });

    it('it should filter gyms by city', (done) => {
      chai.request(server)
        .get('/api/v1/gyms?search=test1kaunas')
        .end((err, res) => {
          if (err) {
            console.log(err);
          }
          expect(res).to.have.status(200);
          expect(res.body.length).to.be.equal(2);
          expect(res.body).to.be.a('array');
          done();
        });
    });

    it('it should sort gyms by likes (descending)', (done) => {
      chai.request(server)
        .get('/api/v1/gyms?sort=likes')
        .end((err, res) => {
          if (err) {
            console.log(err);
          }
          expect(res).to.have.status(200);
          expect(res.body.length).to.be.equal(16);
          expect(res.body[0].likes.length).to.be.gte(res.body[res.body.length - 1].likes.length);
          expect(res.body).to.be.a('array');
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
          expect(res.body.name).to.be.equal('test');
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

  // likes
  describe('/POST gym like', () => {
    it('it should like specific gym', (done) => {
      chai.request(server)
        .post('/api/v1/gyms/' + gymId + '/like')
        .set('Authorization', token)
        .end((err, res) => {
          if (err) {
            console.log(err);
          }
          expect(res).to.have.status(201);
          expect(res.body.likes).to.containSubset([{user: userId}]);
          done();
        });
    });

    it('it should not let like more than one time', (done) => {
      chai.request(server)
        .post('/api/v1/gyms/' + gymId + '/like')
        .set('Authorization', token)
        .end((err, res) => {
          if (err) {
            console.log(err);
          }
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('errors');
          done();
        });
    });
  });

  describe('/POST gym unlike', () => {
    it('it should unlike specific gym', (done) => {
      chai.request(server)
        .post('/api/v1/gyms/' + gymId + '/unlike')
        .set('Authorization', token)
        .end((err, res) => {
          if (err) {
            console.log(err);
          }
          expect(res).to.have.status(201);
          expect(res.body.likes).not.to.containSubset([{user: userId}]);
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

    it('it should not find gym review in specific gym (not found)', (done) => {
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

    it('it should respond with not found when deleting gym with wrong id (not found)', (done) => {
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
