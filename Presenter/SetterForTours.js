const path = require("node:path")
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
 *@param {object} data - Champs du formulaire multipart et fichier image
 *@returns {ResponseType}
 */
function SetNewTour(data,calllback) {
    console.log(data)
    try {
        if(!data) {
            return calllback({
                status : "ko",
                message : "Le nom du circuit est requis"
            })
        }
        if(!data.image || typeof data.image.name !== "string") {
            return calllback({
                status : "ko",
                message : "Le fichier image est requis"
            })
        }
const file_extention = data.image.name.split(".").pop()
        console.log(file_extention)

        const name = data.image.name
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "")
                            .trim()
                            .replace(/\s+/g, "_")
                            .replace(/[^a-zA-Z0-9_]/g, "")
                            .replace(/^_+|_+$/g, "")
        const filename_will = name.split(file_extention.toString())[0] + "." + file_extention
        const data_before_commit = Circuit.build({
            title : data.title,
            subtitle : data.subtitle,
            duration : data.duration,
            difficulty : data.difficulty,
            price : data.price,
            image : filename_will,
            description : data.description
        })
        data_before_commit.save().then((value) => {
            calllback({
                status : "ok",
                message : value.getDataValue("id")
            })  
        }).catch((err) => {
            console.log(err)
            calllback({
                status : "ko",
                message : err
            })
        })
    } catch (error) {
                    console.log(error)
        calllback({
            status : "ko",
            message : error
        })
    }
}
module.exports = {
    SetNewTour : SetNewTour
} 