let mongoose = require('mongoose')
let Schema = mongoose.Schema;
const timestamp = require('mongoose-timestamp')

let Customer = new Schema({
    name: { type: String, required: true },
    surveyId: { type: Schema.Types.ObjectId, ref: 'Survey' },
    answers: { type: Array, default: [] },
    ipAddress: { type: String, required: true }
})

Customer.plugin(timestamp)

module.exports = mongoose.model('Customer', Customer)