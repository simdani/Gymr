process.env.NODE_ENV = 'test';

const { expect } = require('chai');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

const User = require('../models/User');

const defaultUser = {
  username: 'testas43',
  email: 'testas431@yahoo.com',
  password: 'testas43',
  password2: 'testas43'
};

describe('Users', () => {
  before((done) => {
    User.deleteOne({ email: defaultUser.email }, (err) => {
      if (err) console.log(err);
      done();
    });
  });

  describe('/POST register', () => {
    it('it should register new user', (done) => {
      chai.request(server)
        .post('/api/v1/users/register')
        .send(defaultUser)
        .end((err, res) => {
          if (err) {
            console.log(err);
          }
          expect(res.redirects.length).to.be.equal(0);
          expect(res).to.have.status(201);
          expect(res.body).to.include.keys('user');
          done();
        });
    });
  });

  describe('/POST login', () => {
    it('it should login new user', (done) => {
      chai.request(server)
        .post('/api/v1/users/login')
        .send({
          email: defaultUser.email,
          password: defaultUser.password
        })
        .end((err, res) => {
          if (err) {
            console.log(err);
          }
          expect(res.redirects.length).to.be.equal(0);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          expect(res.type).to.be.equal('application/json');
          expect(res.body).to.include.keys('token');
          done();
        });
    });
  });
});
