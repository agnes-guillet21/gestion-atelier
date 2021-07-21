import React, {useState, useEffect} from "react";
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import Constante from '../compoGen/const';
import Input from '../classes/InputClass';
import Formulaires from '../compoGen/Formulaires';
import ColonneObjet from '../classes/ColonneClass';
import ListWithValueLoader from '../compoGen/ListWithValueLoader';
import {Container, Row, Col } from 'react-bootstrap'
import * as AiIcons from "react-icons/ai";


/**
 * let history => utiliser pr la navigation
 * dat/SetData => state de recupération de données en BDD
 * requete Ajax pour le formulaire
 * utilisation des set des State pour recuperer les valeurs des inputs
 * @returns 
 */
function Client(idClient){
    const [infos, setInfos ] = useState(null);
    let history = useHistory();
    const [data, setData] = useState(null);
    const [show, setShow] =  useState(false);

    const showFormulaire = () =>{
         setShow(!show);
    }
    useEffect(() => {
        if (data == null) {
            Axios(
                Constante.URL_BACK + '/client/list',
                {
                    method:'GET',
                    withCredentials : true,
                }
            ).then((result) =>{
                setData(result.data);
                
            })
        };
    })
    
    const submit = (value)=>{
        Axios(
        Constante.URL_BACK + "/client/ajout", 
        {
            method: 'POST',
            withCredentials : true, 
            data: JSON.stringify(value),
        headers : {
            'Content-type': 'application/json'
        }
        }).then(() => {
            setShow(false)
            history.replace("/Clients");
            history.go(0);
        });
    }

    const onDelete = (idClient) => {
        Axios(
        Constante.URL_BACK + "/client/suppression/" + idClient,
        {
            method: 'DELETE',
            withCredentials : true, 
            headers :
            {
                'Content-type': 'application/json'
            }
        }).then(() => {
            history.replace("/Clients");
            history.go(0);
        });
    }
    const onClickUpdate = (idClient, value) => {
        console.log('client:', idClient, value);
        // setShow(true);
        setInfos(value);
        return ;
    }    
    const onUpdate = (value) =>{

        console.log(value);
       
         Axios(Constante.URL_BACK + "/client/modification/" + value.id,
         {
             method: 'PUT',
             withCredentials : true,
             data: JSON.stringify(value), 
             headers : {
                 'Content-type': 'application/json'
             }
         }).then((result) => {
             history.replace("/Clients");
             history.go(0);
         });
       
     
     }
    




    const onClose = () => setShow(false);
//------------------JSON pr la 3 col----------------

   let actions = [
    {
        icone: "suppression",
        onClick: onDelete ,
    },
    {
        icone: "edit",
        onClick: onClickUpdate,
    },
];
//--------------Seconde Partie-----------------//
   

    return (
        <Container className="conteneur">
            <Row className="justify-content-center p-4"> Clients
            </Row>
            <Row>
                <Col  xs={6} className="mt-4">
                <ListWithValueLoader  url={Constante.URL_BACK + '/client/list'}
                        cols={[
                            new ColonneObjet("Client", "libelle"),
                            new ColonneObjet("Adresse", "adresse"),
                            new ColonneObjet("Ajouté le :", "dateCreation"),
                            new ColonneObjet("Options", null, actions),
                        ]} 
                    />
                </Col>
               
                <Col xs={6} className="mt-4 p-4">
                    <p>Ajouter un client {<AiIcons.AiOutlinePlus onClick={showFormulaire}/>}</p>
                    {show?( 
                        < Formulaires url={Constante.URL_BACK + '/client/ajout'}
                            inputs={[
                                new Input("text","libelle", "Nom du Client"),
                                new Input("text", "adresse", "Adresse du client :"),
                                new Input("date","dateCreation", "Ajouté le :"),
                            ]} 
                            buttonSubmit={{
                                nom: "valider",
                                onClick: submit,
                            }}
                            buttonOffSubmit={{
                                nom:"Annuler",
                                onClick: onClose,
                            }}
                        />
                    ):null}
                    {infos ?(  
                        < Formulaires infos={infos} url={Constante.URL_BACK + '/client/modification/'+ idClient}
                            inputs={[
                                new Input("text", "libelle", "Nom du client : "),
                                new Input("text", "adresse", "Adresse du client : "),
                                new Input("date", "dateCreation", " Ajouté le : "),
                            ]} 
                            buttonSubmit={{
                                nom:"valider",
                                onClick: onUpdate,
                            }}
                            buttonOffSubmit={{
                                nom:"Annuler",
                                onClick: onClose,
                            }}
                        />
                    ):null}
                </Col>
            </Row>
        </Container>
    )    
}
 export default Client;