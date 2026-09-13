const { Circuit } = require("../Modes/models")

function DeleteTour(id,callback) {
    try {
        Circuit.destroy({  where : {  id : parseInt(id) } })
        callback({status : 'ok'})
    } catch (error) {
        callback({status : "ko"})
    }
}

module.exports = {
    DeleteTour : DeleteTour
}