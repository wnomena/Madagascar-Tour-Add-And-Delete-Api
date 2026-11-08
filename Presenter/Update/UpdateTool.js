const { Equipement } = require("../../Modes/models")

const fields = ["equipment", "circuit_id"]

async function UpdateTool(id, data, callback) {
    const recordId = Number(id)
    if (!Number.isInteger(recordId) || recordId <= 0) {
        return callback({ status: "ko", message: "Identifiant invalide" })
    }

    if (!data || typeof data !== "object" || Array.isArray(data)) {
        return callback({ status: "ko", message: "Données invalides" })
    }

    const values = {}
    for (const field of fields) {
        if (Object.prototype.hasOwnProperty.call(data, field) && data[field] !== undefined) {
            values[field] = data[field]
        }
    }
    if (Object.keys(values).length === 0) {
        return callback({ status: "ko", message: "Aucune donnée à modifier" })
    }

    try {
        const [updatedCount] = await Equipement.update(values, { where: { id: recordId } })
        if (updatedCount === 0) {
            const tool = await Equipement.findByPk(recordId)
            if (!tool) {
                return callback({ status: "ko", message: "Équipement introuvable" })
            }
        }
        return callback({ status: "ok" })
    } catch (error) {
        return callback({ status: "ko", message: error.message })
    }
}

module.exports = { UpdateTool }
