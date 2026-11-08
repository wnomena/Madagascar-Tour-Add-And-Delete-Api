const { Adrenaline } = require("../../Modes/models")

const fields = ["content", "circuit_id"]

async function UpdateAdrenaline(id, data, callback) {
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
        const [updatedCount] = await Adrenaline.update(values, { where: { id: recordId } })
        if (updatedCount === 0) {
            const adrenaline = await Adrenaline.findByPk(recordId)
            if (!adrenaline) {
                return callback({ status: "ko", message: "Élément adrénaline introuvable" })
            }
        }
        return callback({ status: "ok" })
    } catch (error) {
        return callback({ status: "ko", message: error.message })
    }
}

module.exports = { UpdateAdrenaline }
