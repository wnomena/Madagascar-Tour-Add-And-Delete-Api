const {Contact}  = require("../Modes/models")
/**
 * @param {Function} calllback 
 */
function GetterForContacts(calllback) {
    Contact.findAll({
        where :{
            Completed : 1
        } 
    }).then((result) => {
      calllback(result)  
    })
}

module.exports = {
    GetterForContacts : GetterForContacts
}