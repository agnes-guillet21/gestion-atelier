
const express = require('express');
const userRouter = express.Router();
const User =  require('../class/User.class');

 
 // insertion
userRouter.post("/ajout",async (req, res) => {
    await User.insert(req.body.libelleUser, req.body.initialeUser, req.body.dateCreation, req.body.grade);
    res.end();
    
});
//select
userRouter.get("/listSelect",async (req, res) => {
    let rows = await User.listSelect();
    res.send(rows).end();
});
userRouter.get("/list",async (req, res) => {
    let rows = await User.list();
    res.send(rows).end();
});

userRouter.put("/modification/:id",async (req, res)=> {
    const { id } = req.params;
    await User.update(req.body.libelleUser, req.body.initialeUser, req.body.dateCrea, req.body.grade, id);
    res.end();
});

userRouter.delete("/suppression/:id", async (req, res) => { 
    await User.delete(req.params.id);
    res.end();
});
    module.exports = userRouter;