let appConfig = require('config')

const MainController = require(`${config.path.mainController}`)

module.exports = class Controlelr extends MainController {
    constructor() {
        super()
        this.controllertag = 'User'
    }
}