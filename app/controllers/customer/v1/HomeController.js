const Controller = require(`${config.path.controllers.survey}/Controller`)
const TAG = 'v1 Customer'

module.exports = new class CustomerController extends Controller {
    async submitCustomer(req, res) {
        try {
            req.checkBody('name', 'please enter customer name').notEmpty();
            req.checkBody('surveyId', 'please enter survey id').notEmpty();
            req.checkBody('answers', 'please enter survey answers').notEmpty();
            if (this.showValidationErrors(req, res)) return;

            // save ip and customer data in mongodb customer collection
            let params = {
                name: req.body.name,
                surveyId: req.body.surveyId,
                answers: req.body.answers,
                ipAddress: req.ip
            }

            let filter = { _id: params.surveyId }
            let survey = await this.model.Survey.findOne(filter)
            if(!survey) 
                return res.json({
                    success: false,
                    message: "نظرسنجی پیدا نشد"
                })

            filter = { name: params.name  }
            let customer = await this.model.Customer.findOne(filter)
            if(customer)
                return res.json({
                    success: false,
                    message: "شما قبلا این نظرسنجی را کامل کردید"
                })
                
            await this.model.Customer.create(params)    
                
            return res.json({
                success: true,
                message: "اطلاعات شما با موفقیت ثبت شد"
            })

        } catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
            .parent(this.controllerTag)
            .class(TAG)
            .method('submitCustomer')
            .inputParams(req.body)
            .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }
}