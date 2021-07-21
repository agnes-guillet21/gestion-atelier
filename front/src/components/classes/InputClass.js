
class Input { 


/**
 * 
 * @param {String} type 
 * @param {String} name 
 * @param {String} label 
 * @param {JSON} options 
 */
    constructor(type, name, label, onChange,value, options) {
        this._type = type;
        this._name =  name;
        this._label = label;
        this._onChange = onChange;
        this._value = value;
        this._url = options != null ? options.url : null;
        //this._value = options != null ? options.value : null;

    }

    getType() {
        return this._type;
    }

    getName() {
        return this._name;
    }

    getLabel() {
        return this._label; 
    }

    getUrl() {
        return this._url;
    }

    getOnChange(){
        return this._onChange;
    }
    getValue(){
        return this._value;
    }

    setValue(newValue){
        this._value = newValue ;
    }
} 
export default Input;




