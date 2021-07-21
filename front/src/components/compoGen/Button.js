import React from "react";
import {Button } from 'react-bootstrap'

function But(props){
    
    const submit = (e) =>{
        e.preventDefault();// ne pas recharger la page 
        props.submit();
        // a gerer 
    }


    return(
   
        <Button variant="outline-info" onClick={submit}>
             <div>{props.nom}</div>
        </Button>
       
   
    )
}
export default But;