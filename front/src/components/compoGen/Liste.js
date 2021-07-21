import React from "react";


function Liste(props){


    return (
        <ul>
            {props.map((item, index) => { 
                   return (
                    <li key={index}> 
                        {item.nom}
                        {item.dateCreation}
                    </li>  
                   )  
            })} 
        </ul>
    )

}
export default Liste;