class Historique{

    constructor() {
    };

    getIdHistorique(){
        return this.id_historique;
    };

    getDescription() {
        return this.description;
    };

    getDateCreation(){
        return this.dateCreation;
    };

    getIdTask(){
        return this.id_task;
    };
   
     //----------------CRUD-------------------//

    async static list() {
        const sqlSelectById = "Select * FROM historique ORDER BY DESC"
        let [rows]= await global.db.query(sqlSelectById)
        if (rows.length > 0) {
            this.id_historique = row[0].id_historique;
            this.description = rows[0].str_libelle;
            this.dateCreation = rows[0].date_creation;
            this.id_task = rows[0].id_task;
        };
    }; 

    async static insert(id_task) {
        const sqlInsertHistorique = "INSERT INTO historique (str_libelle, date_creation) VALUES (" +
        global.db.escape(str_libelle) + "," +
        global.db.escape(date_creation) +
        ", WHERE id_task ="+ global.db.escape(id_task) +";";
        await global.db.query(sqlInsertHistorique);
    };
    
    toJSON() {
        return {
            description: this.description,
            dateCreation: this.dateCreation,
            nameTask: this.id_task,
        };
    };  

}

