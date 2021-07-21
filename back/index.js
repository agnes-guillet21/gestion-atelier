const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
//instanciation du server
const app = express();

// port d'ecoute 
const PORT = 9000;

//config BDD
const mysql = require('mysql2/promise');
const db= mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database : "gestion_atelier_bdd"
});
global.db = db;


app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next(); 
});

/*--------------------------------------------------------------------*/
// utilise app qui est un instance d'express
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());//middleware analyse json
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));


/*------------------------------Definition des Routes--------------------------------------*/

const Grade = require('./router/GradeRouter.js');
app.use('/grade', Grade);

const Fournisseur = require('./router/FournisseurRouter.js');
app.use('/fournisseur', Fournisseur);

const Client = require('./router/ClientRouter.js');
app.use('/client', Client);

const Statut = require('./router/StatutRouter.js');
app.use('/statut', Statut);

const User = require('./router/UserRouter');
app.use('/user', User);

const Task = require('./router/TaskRouter');
app.use('/task', Task);


  // set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
  