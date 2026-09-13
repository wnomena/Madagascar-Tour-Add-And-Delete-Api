class TourModel {
/**
 * @param {string} title - Titre ou nom du TourModel
 * @param {string} subtitle - Sous-Titre
 * @param {string} duration - Durée du voyage
 * @param {number} difficulty - Difficulté du trajet
 * @param {number} price - Prix du voyage
 * @param {string} image - Image de description du voyage
 * @param {string} description - Description de trajet
 */
    constructor(title,subtitle,duration, difficulty,price,image,description) {
        this.title = title
        this.subtitle = subtitle
        this.duration = duration
        this.difficulty = difficulty
        this.price = price
        this.image = image
        this.description = description
    }
}

module.exports = {
    TourModel : TourModel
}