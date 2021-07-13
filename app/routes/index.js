const express = require('express');

const router = express.Router();

const user = require('./user');
const survey = require('./survey')
const customer = require('./customer')

router.use('/user', user);
router.use('/survey', survey)
router.use('/customer', customer)


router.get('/' , (req , res) => {
    res.json('Welcome to Home Page');    
});

router.get('/about' , (req , res) => {
    res.json('Welcome to About Page');
});


module.exports = router;