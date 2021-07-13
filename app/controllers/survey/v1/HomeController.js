const Controller = require(`${config.path.controllers.survey}/Controller`)
const TAG = 'v1 Survey'
const ip = require('ip')
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = new class SurveyController extends Controller {

    async getSurvey(req, res) {
        try {
            req.checkParams('surveyId', 'please enter survey id').notEmpty()
            req.checkParams('customer', 'please enter customer name').notEmpty()
            if (this.showValidationErrors(req, res)) return;
        
            if(!ObjectId.isValid(req.params.surveyId))
                return res.json({
                    success: false,
                    message: "این نظرسنجی وجود ندارد"
                })

            let filter = { _id: req.params.surveyId }
            let survey = await this.model.Survey.findOne(filter)
            if(!survey)
                return res.json({
                    success: false,
                    message: "این نظرسنجی وجود ندارد"
                })
                
            if(!survey.active)
                return res.json({
                    success: false,
                    message: "این نظرسنجی هم اکنون در دسترس نمیباشد"
                })
            
                
            filter = { name: req.params.customer }
            let customer = await this.model.Customer.findOne(filter, 'ipAddress')
            if(customer && customer.ipAddress === req.ip) 
                return res.json({
                    success: false,
                    message: "شما این نظرسنجی را تکمیل کرده اید"
                })
            
            return res.render('home', {
                name: req.params.customer,
                title: survey.title,
                surveyId: survey._id,
                questions: survey.questions
            })

        } catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
            .parent(this.controllerTag)
            .class(TAG)
            .method('getSurvey')
            .inputParams(req.params)
            .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

    async create(req, res) {
        try {
            req.checkBody('name', 'please enter survey name').notEmpty();
            req.checkBody('title', 'please enter survey title').notEmpty();
            req.checkBody('ownerId', 'please enter ownerId').notEmpty();
            req.checkBody('questions', 'please enter questions').notEmpty();
            if (this.showValidationErrors(req, res)) return;

            
            let params = {
                name: req.body.name,
                title: req.body.title,
                ownerId: req.body.ownerId, //req.decodedData.user_id,
                questions: req.body.questions
            }

            let filter = { name: params.name }
            let survey = await this.model.Survey.findOne(filter)
            if(survey && survey.ownerId.toString() === params.ownerId)
                return res.json({
                    success: false, 
                    message: "نظرسنجی با این شناسه قبلا ایجاد شده است"
                })

            filter = { _id: params.ownerId }
            let user = await this.model.User.findOne(filter)    
            if(!user)
                return res.json({
                    success: false,
                    message: "کاربر پیدا نشد"
                })

            let newSurvey = await this.model.Survey.create(params)
            user.survey.push(newSurvey._id)
            await user.save()

            return res.json({
                success: true,
                message: "نظرسنجی با موفقیت ایجاد شد"
            })

        } catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
            .parent(this.controllerTag)
            .class(TAG)
            .method('create')
            .inputParams(req.body)
            .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

    async remove(req, res) {
        try {
            req.checkBody('id', 'please enter survey id').notEmpty();
            if (this.showValidationErrors(req, res)) return;
            
            let params = {
                ownerId: req.decodedData.user_id,
                surveyId: req.body.id
            }

            let filter = { ownerId: params.ownerId }
            let survey = await this.model.Survey.findOne(filter)
            if(!survey)
                return res.json({
                    success: false,
                    message: "نظرسنجی پیدا نشد"
                })

            if(survey.ownerId != params.ownerId)
                return res.json({
                    success: false,
                    message: "این نظرسنجی به شما تعلق ندارد"
                })

            filter= {
                ownerId: params.ownerId,
                _id: params.surveyId
            }
            // remove related customer data from database???
            await this.model.Survey.deleteOne(filter)
            await this.model.User.updateOne(
                {"_id": params.ownerId}, 
                {$pull: {"survey": survey._id}}
            )
            
            return res.json({
                success: true,
                message: "حذف نظرسنجی با موفقیت انجام شد"
            })

        } catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
            .parent(this.controllerTag)
            .class(TAG)
            .method('remove')
            .inputParams(req.body)
            .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

    async toggle(req, res) {
        try {
            req.checkBody('id', 'please enter survey id').notEmpty();
            if (this.showValidationErrors(req, res)) return;
            
            let survey = await this.model.Survey.findOne({ _id: req.body.id })

            if(!survey)
                return res.json({
                    success: false,
                    message: "نظرسنجی پیدا نشد"
                })
            
            survey.active = !survey.active
            await survey.save()

            return res.json({
                success: true,
                message: "با موفقیت انجام شد"
            })

        } catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
            .parent(this.controllerTag)
            .class(TAG)
            .method('toggle')
            .inputParams(req.body)
            .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }
}