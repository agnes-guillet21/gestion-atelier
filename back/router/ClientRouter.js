 //Client route
 
const express = require('express');
const clientRouter = express.Router();
const Client = require("../class/Client.class");

 // insertion
clientRouter.post("/ajout",async (req, res) => {
    await Client.insert(req.body.libelle, req.body.adresse, req.body.dateCreation);
    res.end();
});

clientRouter.get("/list", async(req, res) => {
    let rows = await Client.list();
    res.send(rows).end();
});

clientRouter.get("/listSelect", async(req, res) =>{
    let rows = await Client.listSelect();
    res.send(rows).end();
})
clientRouter.delete("/suppression/:id" , async(req,res) => {
    await Client.delete(req.params.id);
    res.end();
})

clientRouter.put('/modification/:id', function(req, res){
    const { id } = req.params;
     Client.update(req.body.libelle,req.body.adresse, req.body.dateCreation, id);
    res.send('modification fiche de client').end();
     });

module.exports = clientRouter;