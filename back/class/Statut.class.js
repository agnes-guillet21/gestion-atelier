const Utiles = require("./fonctionUtiles");
class Statut {
    constructor() {
    };

    getIdStatut(){
        return this.id_statut;
    };
    getEtat(){
        return this.etat;
    };

    getCouleur(){
        return this.couleur;
    };

    getDateCreation(){
        return this.dateCreation;
    };

    async selectById(id_statut) {
        const sqlSelectById = "SELECT (str_etat, str_couleur, date_creation) FROM statut WHERE id_statut = " + global.db.escape(id_statut) + ";";
        let [rows] = await global.db.query(sqlSelectById);
        if (rows.lenght > 0){
            this.id_statut = rows[0].id_statut;
            this.libelle = rows[0].str_etat;
            this.couleur = rows[0].str_couleur;
            this.dateCreation = rows[0].date_creation;
        };
    };
    static async liste() {
        const sqlListe = "SELECT id_statut, str_etat FROM statut";
        let [rows] = await global.db.query(sqlListe);
        let resultAll = [];
        for (let i = 0; i < rows.length; i++) {
            resultAll.push({
                id: rows[i].id_statut,
               // strTask: rows[i].str_etat.replace(/\s/g, ''),
                libelle: rows[i].str_etat,
            });
        }
        return resultAll;
        
    };
    static async listeALL() {
        const sqlListe = "SELECT id_statut, str_etat, date_creation  FROM statut";
        let [rows] = await global.db.query(sqlListe);
        let resultAll = [];
        for (let i = 0; i < rows.length; i++) {
            resultAll.push({
                id: rows[i].id_statut,
                libelle: rows[i].str_etat,
                dateCrea: Utiles.dateToDateTimeString(rows[i].date_creation),
            });
        }
        return resultAll;
    };

    //Insert 
    static async insert(str_etat, str_couleur, date_creation) {
        const sqlInsertStatut= "INSERT INTO statut (str_etat, str_couleur, date_creation) VALUES (" + global.db.escape(str_etat) + "," + global.db.escape(str_couleur) + "," + global.db.escape(date_creation) + ");";
        await global.db.query(sqlInsertStatut);
    };

    //Update
    static async updateIdTrello(id_statut) {
        const sqlUpdateIdStatut = "UPDATE statut SET id_statut = " + global.db.escape(id_statut) + " WHERE id_statut = " + global.db.escape(id_statut) + ";";
        let [rows] = await global.db.query(sqlUpdateIdStatut);
        return [rows];
    }

    static async update(str_etat, date_creation, id_statut) {
        const sqlUpdateStatut = "UPDATE statut SET str_etat = " + global.db.escape(str_etat) + ", date_creation = " + global.db.escape(date_creation) + "  WHERE id_statut = " + global.db.escape(id_statut) + ";";
        let [rows] = await global.db.query(sqlUpdateStatut);
        return rows;
    };

    //Delete
    static async delete(id_statut) {
        const sqlDeleteStatut = "DELETE FROM statut WHERE id_statut = " + global.db.escape(id_statut) + ";";
        await global.db.query(sqlDeleteStatut);
    }

    toJSON() {
        return {
            libelle: this.etat,
            couleur: this.couleur,
            dateCreation: this.dateCreation,   
        };
    };
}

module.exports = Statut; 


