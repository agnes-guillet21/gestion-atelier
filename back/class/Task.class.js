
const { createPool } = require("mysql2/promise");
const clientRouter = require("../router/ClientRouter");
const Utiles = require("./fonctionUtiles");

class Task {
 #id_task;
 #libelle;
 #decrisption;
 #dateCreation;
 #id_client;
 #id_fournisseur;
 #id_user;
 #id_statut;

    constructor(){
    }
    
    getIdTask(){
        return this.id_task
    };

    getLibelle(){
        return this.libelle
    };

    getDescription() {
        return this.description
    };

    getDateCreation(){
        return this.dateCreation
    };

    getIdClient(){
        return this.id_client
    };
    
    getIdUser(){
        return this.id_user
    };

    getIdFournisseur(){
        return this.id_fournisseur
    };

    getIdStatut(){
        return this.id_statut
    };

    //---------------CRUD-----------//
    static async insert(str_libelle, str_description, date_creation, id_client, id_user, id_fournisseur, id_statut) {
        const sqlInsertTask = "INSERT INTO task (str_libelle, str_description, date_creation, id_client, id_user, id_fournisseur, id_statut) VALUES (" + 
        global.db.escape(str_libelle) + "," +
        global.db.escape(str_description) + "," +
        global.db.escape(date_creation) + "," +
        global.db.escape(id_client) + "," +
        global.db.escape(id_user) + "," +
        global.db.escape(id_fournisseur) + "," +
        global.db.escape(id_statut) + ");"; 
        await global.db.query(sqlInsertTask);
     };

    
     // je recupere des instances d objets de ma classe vu que les requetes sont ds ma classe
     // j ajoute un json 
     //je recupere mes entites de base de données et que je les transpose en objet
    static async list() {
        let sqlList = "SELECT t.str_libelle, t.str_description, c.str_libelle as libelleClient, u.str_libelle as libelleUser, f.str_libelle as libelleFournisseur, s.str_etat, t.date_creation from task as t  INNER JOIN user as u ON u.id_user = t.id_user INNER JOIN statut as s on  s.id_statut = t.id_statut INNER JOIN fournisseur as f on  f.id_fournisseur = t.id_fournisseur INNER JOIN client as c on  c.id_client = t.id_client";
        let [rows] = await global.db.query(sqlList);
        let resultAll = [];
        for (let i = 0; i < rows.length; i++) {
            resultAll.push({
                id: rows[i].id_task, 
                libelle: rows[i].str_libelle,
                description: rows[i].str_description,
                nomClient: rows[i].libelleClient,
                nomUser : rows[i].libelleUser,
                nomFournisseur : rows[i].libelleFournisseur,
                libelleStatut : rows[i].str_etat,
                dateCreation : Utiles.dateToDateTimeString(rows[i].date_creation),
            });
        }
        return resultAll;
    }
    static async listBis(id_task) {
        let sqlList = "SELECT t.str_libelle, t.str_description, c.str_libelle as libelleClient, u.str_libelle as libelleUser, f.str_libelle as libelleFournisseur, s.str_etat, t.date_creation from task as t  INNER JOIN user as u ON u.id_user = t.id_user INNER JOIN statut as s on  s.id_statut = t.id_statut INNER JOIN fournisseur as f on  f.id_fournisseur = t.id_fournisseur INNER JOIN client as c on  c.id_client = t.id_client WHERE t.id_task = " + global.db.escape(id_task) ;
        let [rows] = await global.db.query(sqlList);
        let resultAll = [];
        for (let i = 0; i < rows.length; i++) {
            resultAll.push({ 
                libelle: rows[i].str_libelle,
                description: rows[i].str_description,
                nomClient: rows[i].libelleClient,
                nomUser: rows[i].libelleUser,
                nomFournisseur: rows[i].libelleFournisseur,
                libelleStatut: rows[i].str_etat,
                dateCreation: Utiles.dateToDateTimeString(rows[i].date_creation),
            });
        }
        return resultAll;
    }
    static async listTrello(id_statut) {
        let sqlListForTrello = "SELECT id_task, t.str_libelle, t.id_statut, str_initiale, str_etat from task as t INNER JOIN user as u ON u.id_user = t.id_user INNER JOIN statut as s on s.id_statut = t.id_statut WHERE t.id_statut = " + global.db.escape(id_statut) ;
        let [rows] = await global.db.query(sqlListForTrello);
        let resultAll = [];
        for (let i = 0; i < rows.length; i++) {
            resultAll.push({
                id: rows[i].id_task,
                libelleTask: rows[i].str_libelle,
                idStatut: rows[i].id_statut,
                libelleStatut: rows[i].str_etat,
                initialeUser: rows[i].str_initiale,
            }); 
        };
        return resultAll;
    }
    /*
    resultAll = [
       col {
            id 
            label
            taskIDs
        }
        task{
            id
            label
            initi
        }
    ]
    */

    static async trelloStructure() {
      /*   let sqlTrelloStructure = "SELECT id_task, t.str_libelle, t.id_statut, str_initiale, str_etat from task as t INNER JOIN user as u ON u.id_user = t.id_user INNER JOIN statut as s on s.id_statut = t.id_statut  WHERE s.id_statut = t.id_statut order by t.id_statut ASC;";
        let sqlColWithTaskIds = "select s.id_statut, str_etat , id_task from statut as s inner join task as t ON  s.id_statut = t.id_statut";
        let [rows] = await global.db.query(sqlTrelloStructure);
        let [rows2] = await global.db.query(sqlColWithTaskIds);
        console.log(rows);
        console.log(rows2);
        let resultAll = [];
        let idTasks = [];
        let column = {};
        let idStatutTmp;
        let idTaskTmp; 
        if (rows.length > 0 && rows != null) {
            idStatutTmp = rows[0].idStatut;
            return [];
        }
        for (let i = 0; i < rows.length; i++) {
            if (idStatutTmp != rows[i].idStatut) {
                resultAll.push(column)
                column = [];
            }
            if(!column.include(idStatut)){ // vérifier si idStatut n'existe pas dans le tableau column
                column.push({
                    id: rows[i].id_statut,
                    libelleStatut: rows[i].str_etat,
                    tasksId: [],
                },
                idTasks.push({
                    id: rows[i].id_task,
                    libelleTask: rows[i].str_libelle,
                    idStatut: rows[i].id_statut,
                    libelleStatut: rows[i].str_etat,
                    initialeUser: rows[i].str_initiale,
                }))
            } else {
                // sinon ajouter la tache au idTasks de de la bonne columns 
            }
        }
           
        resultAll.push({tasks: column, idStatut: id_Statut, libelle : str_libelle, taskIds : [] });
        console.log(resultAll); 
        return resultAll; */
        /*
        if (rows.length > 0 && rows != null) {
            idStatutTmp = rows[0].idStatut;   
            console.log("pouet32");
            return [];
        }
        for (let i = 0; i < rows.length; i++) {
            if (idStatutTmp != rows[i].idStatut) {  
                console.log("pouet21");
                resultAll.push(column)
                column = [];
            }
            tasks.push({
                id: rows[i].id_task,
                libelleTask: rows[i].str_libelle,
                idStatut: rows[i].id_statut,
                libelleStatut: rows[i].str_etat,
                initialeUser: rows[i].str_initiale,
            })
        }

        if (rows2.length > 0 && rows != null) {
            idTaskTmp = rows[0].id_task;   
            console.log("pouet33");
            return [];
        }
        for (let i = 0; i < rows2.length; i++){
            column.push({
                id: rows[i].id_statut,
                libelle : rows[i].str_etat,
                idTask : rows[i].id_task,
            })
        }
        resultAll.push(column, tasks);;
        return resultAll;
        */
    }

    static async data() {
            const column = "s.id_statut , s.str_etat, t.id_task, t.str_libelle, u.str_initiale";
            const table = "statut as s LEFT JOIN task as t on s.id_statut = t.id_statut LEFT JOIN user as u ON u.id_user = t.id_user";
            const order = "s.id_statut ASC"
            const sqlListForTrello = "SELECT " + column + " FROM " + table + " ORDER BY " + order;
            let [rows] = await global.db.query(sqlListForTrello);
            let idStatutTmp;
            let libelleStatTmp;
            let resultAll = [];
            let tasks = [];
            if (rows == null || rows.length == 0) { 
                return [];
            }
            libelleStatTmp= rows[0].str_etat;
            idStatutTmp = rows[0].id_statut; 
            for (let i = 0; i < rows.length; i++) {
                if (idStatutTmp != rows[i].id_statut) {  
                    resultAll.push({
                       tasks: tasks,
                       idStatut: idStatutTmp,  
                       libelleStatut: libelleStatTmp,
                    });
                    tasks = [];//reset des tasks
                    console.log(resultAll);
                } 
                if (rows[i].id_task != null) {
                   tasks.push({
                        id: rows[i].id_task,
                        libelleTask: rows[i].str_libelle,
                        idStatut: rows[i].id_statut,
                        initialeUser: rows[i].str_initiale,
                    }); 
                }
                console.log(rows[i].id_task);
                idStatutTmp = rows[i].id_statut;
                libelleStatTmp= rows[i].str_etat; 
            }
            resultAll.push({ tasks: tasks, idStatut: idStatutTmp, libelleStatut: libelleStatTmp});
            console.log(resultAll);
            return resultAll;

            /*
            TextRow {
                id_task: 20,
                str_libelle: ' 42',
                id_statut: 2,
                str_initiale: 'po',
                str_etat: 'attente de livraison'
            },
            TextRow {
                id_task: 21,
                str_libelle: ' 44',
                id_statut: 2,
                str_initiale: 'lo',
                str_etat: 'attente de livraison'
            },
            TextRow {
                id_task: 18,
                str_libelle: 'task 3',
                id_statut: 3,
                str_initiale: 'qu',
                str_etat: 'préparation'
            }
            ]

            [
            TextRow {
                id_statut: 2,
                str_etat: 'attente de livraison',
                id_task: 20
            },
            TextRow {
                id_statut: 2,
                str_etat: 'attente de livraison',
                id_task: 21
            },
            TextRow { id_statut: 3, str_etat: 'préparation', id_task: 16 },
            TextRow { id_statut: 3, str_etat: 'préparation', id_task: 18 }
            ]
            
            const column = "id_statut , str_etat"
            let sqlListForTrello = "SELECT id_task, t.str_libelle, t.id_statut, str_initiale, str_etat from task as t INNER JOIN user as u ON u.id_user = t.id_user INNER JOIN statut as s on s.id_statut = t.id_statut  WHERE s.id_statut = t.id_statut order by t.id_statut ASC;";
            let [rows] = await global.db.query(sqlListForTrello);
            let resultAll = [];
            let column = [];
            let idStatutTmp;
            if ( rows.length > 0 && rows != null) {
                idStatutTmp = rows[0].idStatut;   
                return [];
            }
            for (let i = 0; i < rows.length; i++) {
                if (idStatutTmp != rows[i].idStatut) {  
                    resultAll.push(column)
                    column = [];
                }
                column.push({
                    id: rows[i].id_task,
                    libelleTask: rows[i].str_libelle,
                    idStatut: rows[i].id_statut,
                    libelleStatut: rows[i].str_etat,
                    initialeUser: rows[i].str_initiale,
                }) 
            }
            resultAll.push({tasks: column, idStatut: id_statut, libelle :  str_etat});
            console.log(resultAll); 
            return resultAll;*/
        }

    async update(id_statut, id_task){
        const sqlUpdateTask = "Update task SET id_statut =" + global.db.escape(id_statut) + " WHERE id_task = " + global.db.escape(id_task);
        let [rows] = await global.db.query(sqlUpdateTask);
            let resultAll = [];
            for (let i = 0; i < rows.length; i++) {
              resultAll.push({
                id: rows[i].id_task, 
                idStatut: rows[i].id_statut,
              }); 
          }  
          return resultAll;
    }

    static async delete(id_task){
        const sqlDeleteTask = "DELETE FROM task WHERE id_task = " + global.db.escape(id_task) 
        await global.db.query(sqlDeleteTask);
    }

    toJSON(){
        return {
            id: this.id_task,
            libelleTask: this.libelle,
            description: this.description,
            dateCrea: this.dateCreation,
            idClient: this.id_client,
            idUser: this.id_user,
            idFournisseur: this.id_fournisseur,
            idStatut: this.id_statut, 
        };
    };  

}
module.exports = Task; 