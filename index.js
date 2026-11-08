const express = require("express")
const FileUpload = require("express-fileupload")
const {sequelize, Contact} = require("./Modes/models")
const {SetNewTour} = require("./Presenter/SetterForTours")
const { TourModel } = require("./Modes/PostModelForTour")
const { ResponseType } = require("./Modes/ResponseModel")
const {GetterForContacts} = require("./Presenter/GetterForContact")
const { StandardContact } = require("./Modes/PosterForContact")
const { UpdateToSeen } = require("./Presenter/UpdaterForContact")
const {ToolSetter} = require("./Presenter/ToolSetter")
const { ToolClass } = require("./Modes/PosterForTools")
const {IncludedSetter} = require("./Presenter/IncludedSetter")
const { AdrenalineSetter } = require("./Presenter/SetterForAdrenaline")
const { DeleteTour } = require("./Presenter/DeleteTour")
const { UpdateTour } = require("./Presenter/Update/UpdateTour")
const { UpdateTool } = require("./Presenter/Update/UpdateTool")
const { UpdateIncluded } = require("./Presenter/Update/UpdateIncluded")
const { UpdateAdrenaline } = require("./Presenter/Update/UpdateAdrenaline")
const app = express()
app.use(express.json())
app.use(FileUpload({
    createParentPath : false
}))
const port = 5001

function error(e) {
    console.error(e)
}
sequelize.authenticate()
    .then(() => 
        sequelize.sync())
            .then(() => {
            app.route("/tour")
                    .post((req,res) => {
                        const Formulaire = req.body
                        SetNewTour(new TourModel(Formulaire["title"],Formulaire["subtitle"],Formulaire["duration"],Formulaire["difficulty"],Formulaire["price"],Formulaire["image"],Formulaire["description"]),(value) => {
                        const status = value.status == "ok" ? 200 : 400
                        return res.status(parseInt(status)).json({
                            status : value.status,
                            message : value.message
                        })
                    }) 
                })
                    .delete((req,res) => {
                        const id = req.query.id
                        DeleteTour(id,(e) => {
                            if(e.status == "ok") return res.json({ status : "ok"  })
                            else if(e.status == "ko") return res.status(400).json({ status : "ko", message : e.message })
                        })
                    })
                    .put((req,res) => {
                        UpdateTour(req.query.id, req.body, (e) => {
                            const status = e.status === "ok" ? 200 : 400
                            return res.status(status).json(e)
                        })
                    })
            app.post("/tool",(req,res) => {
                const equipement = req.body
                ToolSetter(new ToolClass(undefined,undefined,equipement["equipment"],equipement["circuit_id"]),(e) => {
                    const status = e == "ok" ? 200 : 400
                    return res.status(parseInt(status)).json({ status : e.status}) 
                })
            })
            app.put("/tool",(req,res) => {
                UpdateTool(req.query.id, req.body, (e) => {
                    const status = e.status === "ok" ? 200 : 400
                    return res.status(status).json(e)
                })
            })
            app.post("/included_in_price",(req,res) => {
                const equipement = req.body
                IncludedSetter(new ToolClass(undefined,undefined,equipement["content"],equipement["circuit_id"]),(e) => {
                    const status = e == "ok" ? 200 : 400
                    return res.status(parseInt(status)).json({ status : e.status}) 
                })
            })
            app.put("/included_in_price",(req,res) => {
                UpdateIncluded(req.query.id, req.body, (e) => {
                    const status = e.status === "ok" ? 200 : 400
                    return res.status(status).json(e)
                })
            })
            app.post("/adrenaline",(req,res) => {
                const equipement = req.body
                AdrenalineSetter(new ToolClass(undefined,undefined,equipement["content"],equipement["circuit_id"]),(e) => {
                    const status = e == "ok" ? 200 : 400
                    return res.status(parseInt(status)).json({ status : e.status}) 
                })
            })
            app.put("/adrenaline",(req,res) => {
                UpdateAdrenaline(req.query.id, req.body, (e) => {
                    const status = e.status === "ok" ? 200 : 400
                    return res.status(status).json(e)
                })
            })
            app.route("/contact")
                    .get((req,res) => {
                        GetterForContacts((result) => {
                            console.log(result)
                            if(Array.isArray(result)) {
                                if(result.length > 0 && result[0] instanceof Contact) {
                                    const resultat = []
                                    result.forEach((element) => {
                                        const instance = new StandardContact()
                                        instance.AjoutDepuisDB(element)
                                        resultat.push(instance.Get())
                                    })
                                    console.log(resultat)
                                    return res.json({
                                        status : "ok",
                                        data : resultat
                                    })
                                }
                                 else if(Array.from(result).length == 0){
                                return res.status(400).json({
                                    status : "ko",
                                    message : "Vide"
                                })
                            }
                            } else if(Array.isArray(result) && result.length == 0) {
                                return res.status(400).json({
                                    status : "ko"
                                })
                            } else {
                                return res.status(500).json({
                                    status : "ko"
                                })
                            }
                        })
                    })
                    .put((req,res) => {
                        const id = req.query.id
                        UpdateToSeen(id,(e) => {
                            if(e.status == "ok") return res.json({ status : "ok"  })
                            else if(e.status == "ko") return res.status(400).json({ status : "ko", message : e.err })
                        })
                    })
        app.listen(port,() => console.log("ça marche"))
        }).catch((e) => {
            error(e)
        })