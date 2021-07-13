process.env.NODE_ENV = 'test';
let chai = require('chai');
let should = chai.should()
const sectionName = 'V1 user home Tests'
const baseRoute = '/api/user/v1'
let chaiHttp = require('chai-http')
let server = require('../../../server')
let appConfig = require('config')
let registerUser, loginUser, accessToken, idToken
const axios = require('axios').default

chai.use(chaiHttp)

describe(`${sectionName}`, () => {

    before((done) => {
        console.log('Waiting to ensure database connection established')
        registerUser = appConfig.test.registerUser
        loginUser = appConfig.test.loginUser
        axios.post(`http://localhost:4000/api/user/v1/login`, {loginUser})
            .then(function (response) {
                response = response.data;
                if (response.success) {
                    idToken = response.data.idToken
                    accessToken = response.data.accessToken
                } else {
                    console.log("errorrrrrrrrrr: no token provided ");
                }
                setTimeout(() => {
                    console.log('Okay, lets begin!');
                    done();
                }, 1000);
            })
            .catch((error) => {
                console.log("error", error);
            });
        done()
    })
    
    describe('Check get Apis', () => {

        it('check home', async () => {
            const res = await chai
                .request(server)
                .get(`/api/`)
                .send();
            res.should.have.status(200);
        });

    });

    describe('Check Post Apis', () => {

        it('check register', async () => {
            const res = await chai
                .request(server)
                .post(`${baseRoute}`)
                .send(registerUser);
            res.should.have.status(200);
        });

    })

    after(async () => {
        console.log(`Section ${sectionName} finished`);
    });
    
})

