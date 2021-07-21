const Utiles = require("./fonctionUtiles");
class Client {

    //constru
    constructor() {
    };

//----------------getter-setter---------------
    getIdClient() {
        return this.id_client;
    }

    getLibelle() {
        return this.libelle;
    }

    getAdresse() {
        return this.adresse;
    }

    getDateCreation() {
        return this.dateCreation;
    }


//----------------CRUD---------------
  
    async selectById(id_client) {
        const sqlSelectById= "SELECT * from client WHERE id_client = " + global.db.escape(id_client) + ";";
        let [rows]= await global.db.query(sqlSelectById);
        if (rows.length >0){
            this.id_client = rows[0].id_client;
            this.libelle = rows[0].str_libelle;
            this.adresse = rows[0].str_adresse;
            this.dateCreation = rows[0].date_creation;
        }; 
    };
    //selectAll
    static async list() {
        const sqlSelectAll = "SELECT * FROM client";
        let [rows]= await global.db.query(sqlSelectAll);
        let resultAll = [];
        for (let i = 0; i < rows.length; i++) {
            resultAll.push({ 
                id: rows[i].id_client,
                libelle: rows[i].str_libelle,
                adresse : rows[i].str_adresse,
                dateCreation:  Utiles.dateToDateTimeString(rows[i].date_creation),
                
            })
        }
        return resultAll;
    }
    static async listSelect() {
        const sqlSelect = "SELECT id_client, str_libelle FROM client";
        let [rows] = await global.db.query(sqlSelect);
        let resultAll = [];
        for (let i = 0; i < rows.length; i++) {
            resultAll.push({
                id: rows[i].id_client,
                libelle: rows[i].str_libelle, 
            })
        }
        return resultAll;
    }
    //selectprTask
    static async selectClientTask() {
        const sqlSelect = "SELECT * FROM client";
        let [rows]= await global.db.query(sqlSelectAll);
        let resultAll = [];
        for (let i = 0; i < rows.length; i++){
            resultAll.push({
            id: rows[i].id_client, 
            })
        }
        return resultAll;
    }
       //insert 
    static async insert(str_libelle, str_adresse, date_creation) {
        const sqlInsertClient= "INSERT INTO client (str_libelle, str_adresse, date_creation) VALUES (" + global.db.escape(str_libelle) + "," + global.db.escape(str_adresse) + "," + global.db.escape(date_creation) + ");";
        await global.db.query(sqlInsertClient);
    };
    
    static async update(str_libelle, str_adresse, date_creation, id_client) {
        const sqlUpdateClient = "UPDATE client SET str_libelle = " + global.db.escape(str_libelle) + ", adresse = " + global.db.escape(str_adresse) + ", date_creation = " + global.db.escape(date_creation) +  "  WHERE id_client = " + global.db.escape(id_client) + ";";
        let [rows] = await global.db.query(sqlUpdateClient);
        return rows;
    };
    
        //delete
    static async delete(id_client) {
        const sqlDeleteClient = "DELETE FROM client where id_client = "+ global.db.escape(id_client)+ ";";
        await global.db.query(sqlDeleteClient);
    };
    
    toJSON(){
        return{
            libelle : this.libelle,
            adresse : this.adresse,
            dateCreation: this.dateCreation,
        };
    };
}


module.exports = Client; 
