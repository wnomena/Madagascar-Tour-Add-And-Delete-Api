const {Contact} = require("../Modes/models")

async function UpdateToSeen(id,calllback) {
    try {
         Contact.update({  Completed : 0  },{  where : { id : parseInt(id) }})
        calllback({ status : "ok"})
    } catch (error) {
        calllback({ status : "ko", err : error })
    }
}

module.exports = {
    UpdateToSeen : UpdateToSeen
}