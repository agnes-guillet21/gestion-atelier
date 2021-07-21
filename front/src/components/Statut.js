import React, {useState} from "react";
import Axios from 'axios'

function  Statut() {
    const [etatStatut, setLibelleStatut] = useState('');
    const [couleurStatut, setCouleurStatut] = useState('');
    const [dateCrea, setDateCrea] = useState('');

    const submit = ()=>{
        Axios("http://localhost:9000/statut/ajout", {
            //creation object json
          //  libelleGrade: libelleGrade,
           // dateCrea : dateCrea,
            method: 'POST',
            withCredentials : true, 
            data: JSON.stringify({
                etatStatut: etatStatut,
                couleurStatut: couleurStatut, 
                dateCrea: dateCrea,
            }),
            headers : {
                'Content-type': 'application/json' // precise que  c est au format json
            }
        }).then(()=>{
        
        });
     };

return(
    <div className = "formInsertStatut">
        <label>Nom : </label>
        <input 
            type="text"
            name="libelleStatut" 
            onChange={(e)=>{
            setLibelleStatut(e.target.value);
                 }}
            />
    
            <label> Couleur associée:  </label>
            <input 
                type="text" 
                name="couleurStatut" 
                onChange={(e)=>{
                setCouleurStatut(e.target.value);
                }}
            />
    
            <label>Date de création :  </label>
            <input 
                type="Date" 
                name="dateCrea" 
                onChange={(e)=>{
                setDateCrea(e.target.value);
                }}
            />
    
                <button onClick={submit}>Submit</button>
            </div>  
        )
    
}
export default Statut;