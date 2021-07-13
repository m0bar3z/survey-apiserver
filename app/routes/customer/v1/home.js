const express = require('express')
const router = express.Router()

// controllers
const { customer: customerController } = config.path.controllers

const HomeController = require(`${customerController}/v1/HomeController`)

/**
 * @api {post} /api/customer/v1 submit customer
 * @apiVersion 1.0.0
 * @apiName submit customer
 * @apiDescription submit customer data
 * @apiGroup customer
 * @apiParam {varchar} name customer name
 * @apiParam {varchar} surveyId survey id
 * @apiParam {varchar} answers survey answers
 * @apiSuccessExample {json} Success-Response:
 * { 
 *  success: true, 
 *  message: "اطلاعات شما با موفقیت ثبت شد" 
 * }
 * @apiErrorExample  {json} Error-Response:
 * { 
 *  success: false,
 *  message: "شما قبلا این نظرسنجی را کامل کردید" 
 * }
 */
 router.post('/' , HomeController.submitCustomer.bind(HomeController));
 

module.exports = router