let mongoose = require('mongoose')
let Schema = mongoose.Schema
const timestamp = require('mongoose-timestamp')

let Survey = new Schema ({
    active: { type: Boolean, default: true },
    name: { type: String, required: true },
    title: { type: String, required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
    view: { type: Number, default: 0 },
    questions: { type: Array, default: [] }
})

Survey.plugin(timestamp)

module.exports = mongoose.model('Survey', Survey)