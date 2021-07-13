const express = require('express')
const router = express.Router()

// controllers
const { user: userController } = config.path.controllers

const HomeController = require(`${userController}/v1/HomeController`)

/**
 * @api {post} /api/user/v1 register
 * @apiVersion 1.0.0
 * @apiName register
 * @apiDescription resgister user
 * @apiGroup user
 * @apiParam {varchar} username user username
 * @apiParam {varchar} password user password
 * @apiParam {varchar} name name
 * @apiParam {varchar} family family
 * @apiParam {varchar} email email
 * @apiParam {varchar} mobile mobile
 * { 
 *  success: true, 
 *  message: "ثبت نام با موفقیت انجام شد" 
 * }
 * @apiErrorExample {json} Error-Response:
 * { 
 *  success: false, 
 *  message: "شماره موبایل برای حساب کاربری دیگری استفاده شده است" 
 * }
 */
router.post('/', HomeController.register.bind(HomeController));


/**
 * @api {post} /api/user/v1/login login
 * @apiVersion 1.0.0
 * @apiName login
 * @apiDescription login user
 * @apiGroup user
 * @apiParam {varchar} username user username
 * @apiParam {varchar} password user password
 * @apiSuccessExample {json} Success-Response:
 * { 
 *  success: true, 
 *  message: "با موفقیت وارذ شذیذ" 
 * }
 * @apiErrorExample {json} Error-Response:
 * { 
 *  success: false, 
 *  message: "نام کاربری یا رمز عبور صحیح نمیباشد" 
 * }
 */
 router.post('/login', HomeController.login.bind(HomeController));


module.exports = router