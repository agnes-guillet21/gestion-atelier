
 
class TabStructure{

    constructor(nom, value, actions) {
        this._nom = nom;
        this._value = value;
        this._actions = actions;
    }

    getNom() {
        return this._nom;
    }
   
    getValue() {
        return this._value;
    }
    getActions() {
        return this._actions;
    }

    

}

export default TabStructure;