
class Boutn{

    constructor(nom, type, titre, onClick){
        this._nom = nom;
        this._titre = titre;
        this._onClick = onClick;
    }

    getName() {
        return this._nom;
    }
    getTitre() {
        return this._titre;
    }
    getOnClick() {
        return this._onClick;
    }
   

}
export default Boutn;