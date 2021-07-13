process.env.NODE_ENV = 'test';
let chai = require('chai');
let should = chai.should()
const sectionName = 'V1 survey Tests'
const baseRoute = '/api/survey/v1'
let chaiHttp = require('chai-http')
let server = require('../../../server')
let appConfig = require('config')
let newSurvey, accessToken, idToken, loginUser, removeSurvey, 
toggleSurvey, getSurvey
const axios = require('axios').default

chai.use(chaiHttp)


describe(`${sectionName}`, () => {

    before((done) => {
        console.log('Waiting to ensure database connection established')
        newSurvey= appConfig.test.newSurvey
        removeSurvey= appConfig.test.removeSurvey
        toggleSurvey= appConfig.test.toggleSurvey
        loginUser= appConfig.test.loginUser
        getSurvey= appConfig.test.getSurvey
        axios.post(`http://localhost:4000/api/user/v1/login`, loginUser)
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
    })

    describe('Check Get Apis', () => {

        it('check get survey', async () => { 
            const res = await chai
                .request(server)
                .get(`${baseRoute}/60b78bab73c81f6eaffecf67/sdfsf`)
                //.send(getSurvey)
            res.should.have.status(200)
        })
    })

    describe('Check Post Apis', () => {

        it('check create survey', async () => { 
            const res = await chai
                .request(server)
                .post(`${baseRoute}`)
                .set('authorization', accessToken)
                .set('idToken', idToken)
                .send(newSurvey)
            res.should.have.status(200)
        })

        it('check remove survey', async () => {
            const res = await chai
                .request(server)
                .delete(`${baseRoute}/remove`)
                .set('authorization', accessToken)
                .set('idToken', idToken)
                .send(removeSurvey)
            res.should.have.status(200)
        })

        it('toggle survey status', async () => { 
            const res = await chai
                .request(server)
                .put(`${baseRoute}/toggle`)
                .set('authorization', accessToken)
                .set('idToken', idToken)
                .send(toggleSurvey)
            res.should.have.status(200)
        })

    })
    
    after(async () => {
        console.log(`Section ${sectionName} finished`);
    });
    
})

