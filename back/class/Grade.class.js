const Utiles = require("./fonctionUtiles");


class Grade{
  

    constructor(){
    }
    
    getIdGrade(){
      return this.id_grade;
    };
    getLibelle(){
        return this.libelle;
    };

    getDateCreation(){
        return this.dateCreation;
    };

 //permet de recuperer un objet de type Grade
    async selectById(id_grade){
        const sqlSelectById = "Select * FROM grade WHERE id_grade = " + global.db.escape(id_grade)+";";
        let [rows]= await global.db.query(sqlSelectById)
        if (rows.length > 0) {
            this.id_grade = row[0].id_grade;
            this.libelle = rows[0].str_libelle;
            this.dateCreation = rows[0].Utiles.dateToDateTimeString(rows[i].date_creation);
        };
    };
    static async selectLib(){
        const sqlSelectAll = "SELECT id_grade, str_libelle FROM grade";
        let [rows] = await global.db.query(sqlSelectAll);
        let resultAll =[];
        for (let i = 0; i < rows.length; i++) {
            resultAll.push({
                id : rows[i].id_grade, 
                libelle: rows[i].str_libelle,
               // dateCreation: Utiles.dateToDateTimeString(rows[i].date_creation),
            })
        };
        return resultAll;
    };
    static async listAll() {
        const sqlSelectAll = "SELECT id_grade, str_libelle, date_creation FROM grade";
        let [rows] = await global.db.query(sqlSelectAll);
        let resultAll =[];
        for (let i = 0; i < rows.length; i++) {
            resultAll.push({
                id : rows[i].id_grade, 
                libelle: rows[i].str_libelle,
                dateCreation: Utiles.dateToDateTimeString(rows[i].date_creation),
            })
        };
        return resultAll;
    };


    //-------Insert---- a faire les verifs
    static async insert(str_libelle, date_creation) {
        const sqlInsertGrade = "INSERT INTO grade (str_libelle, date_creation) VALUES (" + global.db.escape(str_libelle) + "," + global.db.escape(date_creation) + ");";
         await global.db.query(sqlInsertGrade);
    }; 

    static async update(str_libelle, date_creation, id_grade) {
        const sqlUpdateGrade = "UPDATE grade SET str_libelle = " + global.db.escape(str_libelle) + ", date_creation = " + global.db.escape(date_creation) + "  WHERE id_grade = " + global.db.escape(id_grade) + ";";
        let [rows] = await global.db.query(sqlUpdateGrade);
        return rows;
    };
   
    //-------Delete-----
    static async Delete(id_grade) {
        const sqlDeleteGrade = "DELETE FROM grade WHERE id_grade = " + global.db.escape(id_grade) + ";";
        await global.db.query(sqlDeleteGrade)
    };
   
    toJSON(){
        return {
            idGrade : this.id_grade,
            libelleGrade : this.str_libelle,
            dateCreation : this.dateCreation,
        };
    };
}
module.exports = Grade; 