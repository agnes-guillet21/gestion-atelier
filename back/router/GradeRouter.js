
const express = require("express");
const gradeRouter = express.Router();
const Grade = require("../class/Grade.class");


gradeRouter.post("/ajout",async (req, res) => {
     await Grade.insert(req.body.libelle, req.body.dateCrea);
    res.end();
});

gradeRouter.get("/list", async(req, res) => {
    let rows = await Grade.selectLib();
    res.send(rows).end();
});

gradeRouter.get("/listAll", async(req, res) => {
    let rows = await Grade.listAll();
    res.send(rows).end();
});
    
gradeRouter.get("/selectId", async(req, res) => {
    let gradeId =  new Grade()
    let rows = await gradeId.selectById();
    if(rows == null){
        console.log('erreur')  
    }else{
        res.send(rows).end();
    }   
});
gradeRouter.put("/modification/:id", async (req, res) => {
    const { id } = req.params;
    let rows = await Grade.update(req.body.libelle, req.body.dateCrea, id);
    res.send(rows).end();
});

gradeRouter.delete("/suppression/:id", async (req, res) =>{
    await Grade.Delete(req.params.id);
     res.end();
})
     module.exports = gradeRouter;
