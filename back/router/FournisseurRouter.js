
const express = require('express');
const fournisseurRouter = express.Router();
const Fournisseur = require("../class/Fournisseur.class");
 

// insertion
fournisseurRouter.post("/ajout",async (req, res) => {
    console.log(req.body.dateCreation)
    await Fournisseur.insert(req.body.libelle, req.body.dateCreation);
    res.end();
});

fournisseurRouter.get("/list", async(req, res) => {
    let rows = await Fournisseur.list();
    res.send(rows).end();
});

fournisseurRouter.get("/listSelect", async(req, res) => {
    let rows = await Fournisseur.listSelect();
    res.send(rows).end();
});

fournisseurRouter.get("/select/id", async(req, res) => {
    let fournisseurId = new Fournisseur();
    let rows = await fournisseurId.selectById();
    res.send(rows).end();
});

fournisseurRouter.delete("/suppression/:id" , async (req, res) => {
    await Fournisseur.delete(req.params.id);
    res.end();
});
fournisseurRouter.put("/modification/:id" , async (req, res) => {
    const { id } = req.params;
    await Fournisseur.update(req.body.libelle, req.body.dateCreation, id);
    res.end();
});


    module.exports = fournisseurRouter;