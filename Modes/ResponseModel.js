class ResponseType {
    /**
     * @param {number} status - Status en 1 si reussi ou 0 si erreur
     * @param { string | undefined } [message=""] - Message d'erreur 
     */
    constructor(status,message) {
        this.status = status
        this.message = message
    }
}

module.exports = {
    ResponseType : ResponseType
}