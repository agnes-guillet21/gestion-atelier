
const express = require('express');
const taskRouter = express.Router();
const Task =  require('../class/Task.class');

taskRouter.post('/ajout', async (req, res) => {
    await Task.insert(req.body.libelleTask, req.body.descriptionTask, req.body.dateCrea, req.body.idClient, req.body.idUser, req.body.idFournisseur, req.body.idStatut);
    res.end();
});

taskRouter.get("/list/:id_tache", async (req, res) => {
    let rows = await Task.listBis(req.params.id_tache);
    res.send(rows).end();
});

taskRouter.get("/list", async (req, res) => {
    let rows = await Task.list();
    res.send(rows).end();
});

taskRouter.get("/listTrello/:id_colonne", async (req, res) => {
    let rows = await Task.listTrello(req.params.id_colonne);
    res.send(rows).end();
});

taskRouter.get("/listTrello/:id", async (req, res) => {
    const { id } = req.params;
    let rows = await Task.listTrello(id);
    res.send(rows).end();
});

taskRouter.get("/data", async (req, res) => {
    let rows = await Task.data();
    res.send(rows).end();
});
taskRouter.get("/trello", async (req, res) => {
    let rows = await Task.trelloStructure();
    res.send(rows).end();
});
taskRouter.put("/modificationTask/:id_tache", async (req, res) => {
    const id_tache = req.params.id_tache ;
    if (id_tache >= 0){
        let rows = await Task.update(req.body.id_statut, req.body.id_task);
        res.status(200);
        res.send(rows).end();  
    } else {
        res
          .status(404)
          .json({ message: `error` });
      }
});

taskRouter.delete("/suppression/:id", async (req, res) => {
    await Task.delete(req.params.id);
    res.end();
});

module.exports = taskRouter;