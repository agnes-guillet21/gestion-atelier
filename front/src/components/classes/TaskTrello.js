

class TaskTrello{

    constructor(id, libelleTask, idColonne, libelleColonne , initiale){
        this._id = id;
        this._libelleTask = libelleTask;
        this._idColonne = idColonne;
        this._libelleColonne = libelleColonne;
        this._initiale = initiale ; 
    }
    getId() {
        return this._id;
    }

    getLibelleTask() {
        return this._libelleTask;
    }
    getIdColonne() {
        return this._idColonne;
    }
    getLibelleColonne() {
        return this._libelleColonne;
    }
    getInitiale() {
        return this._initiale;
    }
    
 

}
export default TaskTrello;