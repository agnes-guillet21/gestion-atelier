import React from "react";


// component input
function Input(props){
    
    const onChange = (e) => {
        props.onChange(e.target.value, props.index);
        //faire une verif si le onChange existe
    }
    console.log(props);

    return (
        <input 
            type={props.type}
            value={props.value}
            name={props.name}
            onChange={onChange}
        /> 
    )
}
export default Input;