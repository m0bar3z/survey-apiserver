process.env.NODE_ENV = 'test';
let chai = require('chai');
let should = chai.should()
const sectionName = 'V1 customer Tests'
const baseRoute = '/api/customer/v1'
let chaiHttp = require('chai-http')
let server = require('../../../server')
let appConfig = require('config')
let customerData;
const axios = require('axios').default

chai.use(chaiHttp)


describe(`${sectionName}`, () => {

    before((done) => {
        console.log('Waiting to ensure database connection established')
        customerData = appConfig.test.customerData
        done()
    })

    describe('Check Post Apis', () => {

        it('check submit customer data', async () => { 
            const res = await chai
                .request(server)
                .post(`${baseRoute}`)
                .send(customerData)
            res.should.have.status(200)
        })
    })
    
    after(async () => {
        console.log(`Section ${sectionName} finished`);
    });
})