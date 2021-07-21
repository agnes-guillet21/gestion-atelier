const Utiles = require("./fonctionUtiles");
class User{

    constructor(){
    };

    //----- getter-setter----- 
    getIdUSer(){
        return this.id_user;
    };
    getLibelle(){
        return this.libelle;
    };
    getInitiale(){
        return this.initiale;
    };
    getDateCreation(){
        return this.dateCreation;
    };
    //fk
    getIdGrade(){
        return this.id_grade;
    };


    //----- CRUD-----// 

    async selectById(id_user, id_grade) {
        const sqlSelectById = "SELECT (str_libelle, str_couleur, date_creation) FROM statut WHERE id_user = " + global.db.escape(id_user) + 
        ", AND WHERE  id_grade = " + global.db.escape(id_grade);
        let [rows] = await global.db.query(sqlSelectById);
        if ( rows.lenght > 0){
            this.id_user = rows[0].id_user;
            this.libelle = rows[0].str_libelle;
            this.initiale = rows[0].str_initiale;
            this.dateCreation = rows[0].date_creation;
            this.id_grade = rows[0].id_grade;
        }   
    };

   static async insert(str_libelle, str_initiale, date_creation, id_grade) {
       const sqlInsertUser = "INSERT INTO user (str_libelle, str_initiale, date_creation, id_grade) VALUES (" + 
        global.db.escape(str_libelle) + "," +
        global.db.escape(str_initiale) + "," +
        global.db.escape(date_creation) + "," +
        global.db.escape(id_grade) + ")";
        await global.db.query(sqlInsertUser) ;
    
    };
    static async list() {
        const sqlSelectAll = "SELECT id_user, str_libelle, str_initiale, date_creation, id_grade FROM user";
        let [rows] = await global.db.query(sqlSelectAll);
        let resultAll = [];
        console.log(rows);
        for (let i = 0; i < rows.length; i++) {
            const sqlSelectNameGrade = "SELECT str_libelle as libelleGrade FROM grade WHERE id_grade = " + global.db.escape(rows[i].id_grade);  
            let [rowsGrade] = await global.db.query(sqlSelectNameGrade);
            resultAll.push({ 
                id: rows[i].id_user,
                libelle: rows[i].str_libelle,
                initiale: rows[i].str_initiale,
                dateCreation: Utiles.dateToDateTimeString(rows[i].date_creation),
                grade: rowsGrade[0].libelleGrade,
            })
        }
        return resultAll;
    };

    static async listSelect() {
        const sqlSelect = "SELECT id_user, str_libelle FROM user";
        let [rows] = await global.db.query(sqlSelect);
        let resultAll = [];
        for (let i = 0; i < rows.length; i++) {
            resultAll.push({
                id: rows[i].id_user,
                libelle: rows[i].str_libelle, 
            })
        }
        return resultAll;
    }

    
    static async update(str_libelle, str_initiale, date_creation, id_grade, id_user) {
        const sqlUpdateUser = "UPDATE user SET str_libelle = " + global.db.escape(str_libelle) + ", str_initiale = " + global.db.escape(str_initiale) + ", date_creation = " + 
        global.db.escape(date_creation) + ", id_grade = " + global.db.escape(id_grade) + " WHERE id_user = " + global.db.escape(id_user);
        let [rows] = await global.db.query(sqlUpdateUser); 
        return rows;
    };

    static async delete(id_user) {
        const sqlDeleteUser = "DELETE FROM user WHERE id_user = " + global.db.escape(id_user); 
        await global.db.query(sqlDeleteUser);
    };
    
    toJSON() {
        return {
            id: this.id_user,
            libelle: this.libelle,
            initiale: this.initiale,
            dateCreation: this.dateCreation,
            grade: this.id_grade,
        };
    };
}


module.exports = User;