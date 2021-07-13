const Controller = require(`${config.path.controllers.user}/Controller`)
const TAG = 'v1 Home'
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

module.exports = new class HomeController extends Controller {

    async register(req,res) {
        try {
            req.checkBody('username', 'please enter username').notEmpty();
            req.checkBody('password', 'please enter password').notEmpty();
            req.checkBody('name', 'please enter name').notEmpty();
            req.checkBody('family', 'please enter family').notEmpty();
            req.checkBody('email', 'please enter email').notEmpty();
            req.checkBody('mobile', 'please enter mobile').notEmpty();
            if (this.showValidationErrors(req, res)) return;

            let params = {
                username: req.body.username,
                password: req.body.password,
                name: req.body.name,
                family: req.body.family,
                email: req.body.email,
                mobile: req.body.mobile
            }
            
            let filter = { username: params.username }
            let user = await this.model.User.findOne(filter)
            if(user)
                return res.json({
                    success: false,
                    message: "کاربر با این نام کاربری وجود دارد"
                })


            filter = { mobile: params.mobile }
            user = await this.model.User.findOne(filter)
            if(user)
                return res.json({
                    success: false,
                    message: "شماره موبایل برای حساب کاربری دیگری استفاده شده است"
                })

            await this.model.User.create(params)

            return res.json({
                success: true,
                message: "ثبت نام با موفقیت انجام شد"
            })
            
        } catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('register')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

    async login(req, res) {
        try {
            req.checkBody('username', 'please enter username').notEmpty()
            req.checkBody('password', 'please enter password').notEmpty()
            if (this.showValidationErrors(req, res)) return;
            
            let filter = { username: req.body.username }
            let user = await this.model.User.findOne(filter)
            if(!user)
                return res.json({
                    success: false,
                    message: "کاربر پیدا نشد"
                })
            if(!user.active)
                return res.json({
                    success: false,
                    message: "کاربر در دسترس نمیباشد"
                })
            
            let status = await bcrypt.compare(req.body.password, user.password)
            if (!status)
                return res.json({
                    success: false,
                    message: "نام کاربری یا رمز عبور صحیح نمیباشد"
                })
            
                let options = {
                    expiresIn: config.idTokenExpire,
                    algorithm: config.algorithm,
                    issuer: config.issuer,
                    audience: config.audience
                }
            let payload = {
                user_id: user._id,
                user_active: user.active,
                user_survey: user.survey
            }
            let idToken = jwt.sign(payload, config.secret, options)
            
            options = {
                expiresIn: config.accessTokenExpire,
                algorithm: config.algorithm,
                issuer: config.issuer,
                audience: config.audience
            }

            payload = { scope: config.userScope }

            let accessToken = jwt.sign(payload, config.secret, options)

            let data = { idToken, accessToken };
            
            return res.json({
                success: true,
                message: "با موفقیت وارد شدید",
                data
            })

        } catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('login')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }
}