const { Circuit } = require("../../Modes/models")

const fields = [
    "title",
    "subtitle",
    "duration",
    "difficulty",
    "price",
    "image",
    "description"
]

async function UpdateTour(id, data, callback) {
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
        const [updatedCount] = await Circuit.update(values, { where: { id: recordId } })
        if (updatedCount === 0) {
            const tour = await Circuit.findByPk(recordId)
            if (!tour) {
                return callback({ status: "ko", message: "Tour introuvable" })
            }
        }
        return callback({ status: "ok" })
    } catch (error) {
        return callback({ status: "ko", message: error.message })
    }
}

module.exports = { UpdateTour }
