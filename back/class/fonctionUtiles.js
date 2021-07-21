

class Utiles {
    static dateToDateTimeString(dateCreation) {
        let date = new Date(dateCreation); //permet  de creer un objet de type date

        if (date.getTime().toString() == "NaN") {
            return null;
        }

        let day = date.getDate();
        let month = date.getMonth()+1;
        let year = date.getFullYear();
        
        if (month >0 && month <10 ) {
            month = "0" + month;
        } 

        if (day > 0 && day < 10) {
            day = "0" + day;
        } 
        let dateDay = day + "/" + month + "/" + year; 
        console.log(dateDay);
        return dateDay;
    } 
    static StringToDate(dateCreation) {
        let date = new Date(dateCreation); //permet  de creer un objet de type date

        if (date.getTime().toString() == "NaN") {
            return null;
        }

        let day = date.getDate();
        let month = date.getMonth()+1;
        let year = date.getFullYear();
        
        if (month >0 && month <10 ) {
            month = "0" + month;
        } 

        if (day > 0 && day < 10) {
            day = "0" + day;
        } 
        let dateDay = day + "/" + month + "/" + year; 
        console.log(dateDay);
        return dateDay;
    } 
}
module.exports = Utiles;