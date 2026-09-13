const { Contact } = require("./models")

class StandardContact {

    constructor() {}

    /**
     * @param { string } name - Le nom complet de la personne qui contact 
     * @param { string | undefined } subject - Le Sujet du contact Vue.config.silent = 
     * @param { string } body - La raison de la prise de contact du client
     * @param { string | undefined } number - Le numero de contact du client qui souhaite contacter
     * @param { string | undefined } begining -  La date de début du voyage à faire par le client
     * @param { number | undefined } number_of_person - Le nombre de personne souaitant voyager avec cette personne
     * @param { number | undefined} circuit_id - Identifiant du circuit qui est rattaché à RecuperationDeCircuitEtDetails
     * @param { number} [Completed=1] - Le statut du contact client 
     */
    
    AjoutStandard(id = undefined,name,subject = undefined,body,number = undefined,begining = undefined,number_of_person = undefined,circuit_id = undefined,Completed = 1) {
        this.id = id
        this.name = name
        this.subject = subject
        this.body = body
        this.number = number
        this.begining = begining
        this.number_of_person = number_of_person
        this.circuit_id = circuit_id
        this.Completed = Completed
    }
 
    AjoutDepuisDB(contact) {
        if(contact instanceof Contact) {
            this.id = contact.getDataValue("id")
            this.name = contact.getDataValue("name"),
            this.subject = contact.getDataValue("subject")
            this.body = contact.getDataValue("body")
            this.number = contact.getDataValue("number")
            this.begining = contact.getDataValue("begining")
            this.number_of_person = contact.getDataValue("number_of_person")
            this.circuit_id = contact.getDataValue("circuit_id")
            this.Completed = contact.getDataValue("Completed")
        }
    }

    Get()  {
        return {
        id : this.id,
        name : this.name,
        subject : this.subject,
        body :  this.body,
        number : this.number,
        begining : this.begining,
        number_of_person :  this.number_of_person,
        circuit_id : this.circuit_id,
        Completed : this.Completed,
        }
    }
}

module.exports = {
    StandardContact : StandardContact
}