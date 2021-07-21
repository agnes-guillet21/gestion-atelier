 //Statut route
 
const express = require('express');
const statutRouter = express.Router();
const Statut = require("../class/Statut.class");

 // insertion
statutRouter.post("/ajout", async (req, res) => {
    await Statut.insert(req.body.etatStatut, req.body.couleurStatut, req.body.dateCrea);
    res.end();
});

statutRouter.get("/liste", async (req, res) => {
    let rows = await Statut.liste();
    res.send(rows).end();
});
statutRouter.get("/listeAll", async (req, res) => {
    let rows = await Statut.listeALL();
    res.send(rows).end();
});

statutRouter.put("/modificationTrello/:id", async (req, res) => {
    const { id } = req.params;
    let rows = await Statut.updateIdTrello(req.body.id, req.body.libelle, req.body.dateCrea, id);
    res.send(rows).end();
});

statutRouter.put("/modification/:id", async (req, res) => {
    const { id } = req.params;
    let rows = await Statut.update(req.body.libelle, req.body.dateCrea, id);
    res.send(rows).end();
});

statutRouter.delete("/suppression/:id", async (req, res) => {
    await Statut.delete(req.params.id);
    res.end();
})


    module.exports = statutRouter;