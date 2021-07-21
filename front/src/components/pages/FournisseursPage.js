import React, {useState} from "react";
import {useHistory} from 'react-router-dom';
import Axios from "axios";
import Constante from '../compoGen/const';
import Formulaires from "../compoGen/Formulaires";
import Input from '../classes/InputClass';
import * as AiIcons from "react-icons/ai";
import {Container, Row, Col} from 'react-bootstrap';
import ColonneObjet from '../classes/ColonneClass';
import ListWithValueLoader from '../compoGen/ListWithValueLoader';

 /* let history => utiliser pr la navigation
 * requete Ajax pour le formulaire
 * @returns 
 */
function Fournisseur(idFournisseur) {
    let history = useHistory();
    const [show, setShow] =  useState(false);
    const [fournisseurList, setFournisseurList] = useState("");
    const [infos, setInfos ] = useState(null);
    //-----------------fctions utiles--------------- 
    const showFormulaire = () => {
        setShow(!show);
    }
    const [showFormulaireEdit, setShowFormulaireEdit] =  useState(false);
    const onClose = () =>  setShowFormulaireEdit(!showFormulaireEdit);

    const submit = (value) => {
        Axios(
        Constante.URL_BACK + "/fournisseur/ajout",
        {
            method: 'POST',
            withCredentials : true, 
            data: JSON.stringify(value),
            headers : {
                'Content-type': 'application/json' 
            }
        }).then((result) => {
            setFournisseurList(result.data);
            setShow(false)
            history.replace("/Fournisseurs");
            history.go(0);
        });
    };

    const onDelete = (idFournisseur) => {
        Axios(Constante.URL_BACK + "/fournisseur/suppression/" + idFournisseur,
        {
            method: 'DELETE',
            withCredentials : true,
        }).then(() => {
                history.replace("/Fournisseurs");
                history.go(0);
        });
    }
    const onClickUpdate = (idFournisseur, value) => {
        console.log('fournisseur :', idFournisseur, value);
        // setShow(true);
        setInfos(value);
        return ;
    }    
    const onUpdate = (value) =>{
       console.log(value);
        Axios(Constante.URL_BACK + "/fournisseur/modification/" + value.id,
        {
            method: 'PUT',
            withCredentials : true,
            data: JSON.stringify(value), 
            headers : {
                'Content-type': 'application/json'
            }
        }).then((result) => {
            history.replace("/Fournisseurs");
            history.go(0);
        });
    }
    
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
//--------------------------------
    return (  
        <Container>
            <Row className="justify-content-center p-4"> Fournisseurs</Row>
            <Row>
                <Col className="mt-4">
                    <ListWithValueLoader  url={Constante.URL_BACK + '/fournisseur/list'}
                        cols={[
                            new ColonneObjet("Fournisseurs", "libelle"),
                            new ColonneObjet("Ajouté le :", "dateCreation"),
                            new ColonneObjet("Options", null, actions), 
                        ]} 
                    />
                </Col>
                <Col className="mt-4">
                {<AiIcons.AiOutlinePlus onClick={showFormulaire}/>}
                    {show?(  
                        < Formulaires url={Constante.URL_BACK + '/fournisseur/ajout'}
                            inputs={[
                                new Input("text", "libelle", "Nom du fournisseur : "),
                                new Input("date", "dateCreation", " Crée le : "),
                            ]} 
                            buttonSubmit={{
                                nom:"valider",
                                onClick: submit,
                            }}
                            buttonOffSubmit={{
                                nom:"Annuler",
                                onClick: onClose,
                            }}
                        />
                    ):null}
                    {infos ?(  
                        < Formulaires infos={infos} url={Constante.URL_BACK + '/fournisseur/modification/'+ idFournisseur}
                            inputs={[
                                new Input("text", "libelle", "Nom du fournisseur : "),
                                new Input("date", "dateCreation", " Crée le : "),
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
    );
}

export default Fournisseur;