const {TourModel} = require("../Modes/PostModelForTour")
const {Circuit} = require("../Modes/models")
const {ResponseType} = require("../Modes/ResponseModel")

function ReturnerResult(data) {
    const final = {
        data : new Circuit(),
        setter : (parms) => {
            if(parms instanceof Circuit) this.data = parms
        }
    }
    if(data instanceof Promise) {
        data.then((value) => {
            if(value instanceof Circuit) {
                console.log(value.getDataValue("id"))
                final.setter(value)
            }
        })
    }
    return final.data
}
/**
 *@param {TourModel} data -Il faut insérer des données de type TourModel
 *@returns {ResponseType}
 */
function SetNewTour(data,calllback) {
    try {
        if(data instanceof TourModel) {
        const data_before_commit = Circuit.build({
            title : data.title,
            subtitle : data.subtitle,
            duration : data.duration,
            difficulty : data.difficulty,
            price : data.price,
            image : data.image,
            description : data.description
        })
        data_before_commit.save().then((value) => {
            calllback({
                status : "ok",
                message : value.getDataValue("id")
            })  
        }).catch((err) => {
            calllback({
                status : "ko",
                message : err
            })
        })
    }} catch (error) {
        calllback({
            status : "ko",
            message : error
        })
    }
}
module.exports = {
    SetNewTour : SetNewTour
} 