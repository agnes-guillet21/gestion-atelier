class Select { 


    /**
     * 
     * @param {String} type 
     * @param {String} name 
     * @param {String} label 
     * @param {JSON} options 
     */
        constructor(option, label, onChange,value, options) {
            this._option = option;
            this._label = label;
            this._onChange = onChange;
            this._value = value;
            this._url = options != null ? options.url : null;
    
        }
    
        getOption() {
            return this._option;
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
    export default Select;
    