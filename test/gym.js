// set environment to test
process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

// load note model
const Gym = require('../models/Gym');

chai.use(chaiHttp);

describe('Gyms', () => {
    beforeEach((done) => {
        Gym.deleteMany({}, (err) => {
            done();
        });
    });

    describe('/GET all gyms', () => {
        it('it should get all gyms', (done) => {
            chai.request(server)
                .get('/gyms')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/POST gym', () => {
        it('it should post 1 gym with name', (done) => {
            chai.request(server)
                .post('/gyms')
                .send({name: 'test'})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.name.should.equal('test');
                    done();
                });
        });
    });
});
