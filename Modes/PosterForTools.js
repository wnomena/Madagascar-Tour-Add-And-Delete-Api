const { Equipement } = require("./models")

class ToolClass {
    constructor(id = undefined,created = undefined,equipment,circuit_id) {
        this.id = id
        this.created = created
        this.equipment = equipment
        this.circuit_id = circuit_id
    }

    SetFromEquipementClass(data) {
        if(data instanceof Equipement) {
        this.id = data.getDataValue("id")
        this.created = data.getDataValue("created")
        this.equipment = data.getDataValue("equipment")
        this.circuit_id = data.getDataValue("circuit_id")
    }}

    Getter() {
        return {
            id : this.id,
            created :  this.created,
            equipment : this.equipment,
            circuit_id : this.circuit_id
        }
    }
}


module.exports = {
    ToolClass : ToolClass
}