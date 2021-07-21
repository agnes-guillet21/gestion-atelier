 const Utiles = require("./fonctionUtiles");
 
class Fournisseur {
   /*

    constructor(){
    };
    
    getIdFournisseur(){
        return this.id_fournisseur;
    };
    getLibelle(){
        return this.libelle;
    };

    getDateCreation(){
        return this.dateCreation;
    };
    */
    async selectById(id_fournisseur) {
        const sqlSelectById = "Select * FROM fournisseur WHERE id_fournisseur = "+ global.db.escape(id_fournisseur)+ ";";
        let [rows]= await global.db.query(sqlSelectById)
        if(rows.length >0){
            this.id_fournisseur = row[0].id_fournisseur;
            this.libelle = row[0].str_libelle;
            this.dateCreation = row[0].date_creation; 
        };
    };

    static async list() {
        const sqlSelectAll = "SELECT * FROM fournisseur";
        let [rows] = await global.db.query(sqlSelectAll);
        let resultAll = [];
        for (let i = 0; i < rows.length; i++) {
            resultAll.push({
                id: rows[i].id_fournisseur, 
                libelle: rows[i].str_libelle,
                dateCreation: Utiles.dateToDateTimeString(rows[i].date_creation),
            })
        }
        console.log(resultAll);
        return resultAll;
    }
    static async listSelect() {
        const sqlSelectAll = "SELECT id_fournisseur, str_libelle FROM fournisseur";
        let [rows] = await global.db.query(sqlSelectAll);
        let resultAll = [];
        for (let i = 0; i < rows.length; i++) {
            resultAll.push({
                id: rows[i].id_fournisseur, 
                libelle: rows[i].str_libelle,
            })
        }
        return resultAll;
    };

    // insert 
    static async insert(str_libelle, date_creation){
        const sqlInsertFournisseur= "INSERT INTO fournisseur (str_libelle, date_creation) VALUES (" + global.db.escape(str_libelle) + "," + global.db.escape(date_creation) + ");";
        await global.db.query(sqlInsertFournisseur);
    };

    // Update pas forcmt renvoye ces donnes juste une mise a jour du state en reload la page
    static async update(str_libelle, date_creation, id_fournisseur) {
        const sqlUpdateFournisseur = "UPDATE fournisseur SET str_libelle = " + global.db.escape(str_libelle) + ", date_creation = " + global.db.escape(date_creation) +  "  WHERE id_fournisseur = " + global.db.escape(id_fournisseur) + ";";
        let [rows]= await global.db.query(sqlUpdateFournisseur);
        return rows;
    };
    // Delete
    static async delete(id_fournisseur) {
        const sqlDeleteFournisseur = "DELETE FROM fournisseur WHERE id_fournisseur = " + global.db.escape(id_fournisseur) + ";";
        await global.db.query(sqlDeleteFournisseur);  
    };
 
    toJson() {
        return {
            libelle: this.str_libelle,
            dateCreation: this.dateCreation
        };
    };

}


module.exports = Fournisseur; 
    
