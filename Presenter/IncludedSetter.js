const { Included } = require("../Modes/models");
const { ToolClass } = require("../Modes/PosterForTools");

/**
 * 
 * @param {ToolClass} data 
 * @param { Function } calllback 
 */
function ToolSetter(data,calllback) {
    if(data instanceof ToolClass) {
        const tool = Included.build({
            equipment : data.equipment,
            circuit_id : data.circuit_id
        })
        tool.save().then(() => {
            calllback({
                status : "ok"
            })
        }).catch((err) => {
            calllback({
                status : "ko",
                message : err
            })
        })
    }
}

module.exports = {
    IncludedSetter : ToolSetter
}