const express = require('express')
const router = express.Router()

// controllers
const { survey: surveyController } = config.path.controllers

const HomeController = require(`${surveyController}/v1/HomeController`)

/**
 * @api {get} /api/survey/v1/:surveyId/:customer get survey
 * @apiVersion 1.0.0
 * @apiName get survey.hbs file
 * @apiDescription get survey.hbs 
 * @apiGroup survey
 * @apiParam {varchar} surveyId survey surveyId
 * @apiParam {varchar} customer customer customerName
 * @apiSuccessExample {json} Success-Response:
 * {}
 * @apiErrorExample {json} Error-Response:
 * { 
 *  success: false,
 *  message: "شما این نظرسنجی را تکمیل کرده اید" 
 * }
 */
 router.get('/:surveyId/:customer', HomeController.getSurvey.bind(HomeController));



/**
 * @api {post} /api/survey/v1 create survey
 * @apiVersion 1.0.0
 * @apiName create survey
 * @apiDescription create survey
 * @apiGroup survey
 * @apiParam {varchar} surveyId survey surveyId
 * @apiParam {varchar} name survey name
 * @apiParam {varchar} ownerId owner ownerId
 * @apiParam {varchar} questions survey questions
 * @apiSuccessExample {json} Success-Response:
 * { 
 *  success: true, 
 *  message: "نظرسنجی با موفقیت ایجاد شد" 
 * }
 *  @apiErrorExample {json} Error-Response:
 * { 
 *  success: false,
 *  message: "نظرسنجی با این شناسه قبلا ایجاد شده است" 
 * }
 */
 router.post('/', HomeController.create.bind(HomeController));



 /**
 * @api {delete} /api/survey/v1/remove remove survey
 * @apiVersion 1.0.0
 * @apiName remove survey
 * @apiDescription remove survey
 * @apiGroup survey
 * @apiParam {varchar} surveyId survey surveyId
 * @apiSuccessExample {json} Success-Response:
 * { 
 *  success: true,
 *  message: "حذف نظرسنجی با موفقیت انجام شد" 
 * }
 * @apiErrorExample {json} Error-Response:
 * { 
 *  success: false, 
 *  message: "نظرسنجی پیدا نشد" 
 * }
 */
 router.delete('/remove', HomeController.remove.bind(HomeController));

   /**
 * @api {put} /api/survey/v1/toggle toggle survey
 * @apiVersion 1.0.0
 * @apiName toggle survey
 * @apiDescription toggle survey
 * @apiGroup survey
 * @apiParam {varchar} surveyId survey surveyId
 * @apiSuccessExample {json} Success-Response:
 * { 
 *  success: true,
 *  message: "با موفقیت انجام شد" 
 * }
 * @apiErrorExample {json} Error-Response:
 * { 
 *  success: false,
 *  message: "نظرسنجی پیدا نشد" 
 * }
 */
 router.put('/toggle', HomeController.toggle.bind(HomeController));


 module.exports = router