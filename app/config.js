const { transform } = require("async");
const path = require("path");
let survey = "", customer= ""

module.exports = {
  secret:
    "0979a8b4ffb57b9ba9760c3eec35a6425748c198f3cc08fb9602afd72caf55f3920a1c26dac3c2903eeb7b239a6e72bd56e34518c338ebca902e44e15d61a0ac",
  salt: 10,
  audience: "audience",
  algorithm: "HS256",
  issuer: "issuer",
  accessTokenExpire: 60 * 60,
  idTokenExpire: 60 * 60 * 100,
  verificationCodeUnit: "m",
  verificationCodeDuration: 30,
  userScope: "user",
  publicRoute: [
    "/api/",
    "/api/user/v1",
    "/api/user/v1/login",
    "/api/customer/v1",
    "/api/survey/v1"
  ],
  path: { 
    controllers: {
      root: path.resolve('./app/controllers'),
      user: path.resolve('./app/controllers/user'),
      survey: path.resolve('./app/controllers/survey'),
      customer: path.resolve('./app/controllers/customer')
    },
    models: {
      root: path.resolve('./app/models/'),
      error: path.resolve('./app/models/errors')
    },
    mainController: path.resolve('./app/controllers/MainController'),
    transforms: path.resolve('./app/transforms')
  },
};
