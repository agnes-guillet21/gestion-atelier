 //Historique route
 
 const express = require('express');
 const histoRouter = express.Router();


 // page tous les clients
histoRouter.get('/historique', function(req, res){
    res.send().end();
});
 
 // insertion
histoRouter.post('/historique/ajout', function(req, res){
    res.send().end();
});

//
histoRouter.post('/historique/modification', function(req, res){
    res.send().end();
});

    module.exports = histoRouter;