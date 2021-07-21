import React, {useState} from "react";
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import * as AiIcons from "react-icons/ai";
import Constante from '../compoGen/const';
import {  Container, Row, Col, Button, Card } from 'react-bootstrap';
import ListWithValueLoader from '../compoGen/ListWithValueLoader';
import ColonneObjet from '../classes/ColonneClass';
import FormulaireTask from "../FormulaireTask";
function TasksPage(){

    //const [dataTask, setDataTask] = useState(null);

    const [show, setShow] =  useState(false);
    let history = useHistory();

    const showFormulaire = () =>{
         setShow(!show);
    }
    const onClose = () => setShow(false);

    const submit = (value)=>{
        setShow(true)
        
        Axios(
        Constante.URL_BACK + "/task/ajout", 
        {
            method: 'POST',
            withCredentials : true, 
            data: JSON.stringify(value),
        headers : {
            'Content-type': 'application/json'
        }
        }).then(() => {
            setShow(false)
            history.replace("/Taches");
            history.go(0);
        });
    }

    const onDelete = (id) => {
        Axios (Constante.URL_BACK + "/task/suppression/"+ id,
            {
                method: 'DELETE',
                withCredentials : true, 
                headers : {
                    'Content-type': 'application/json'
                }
            }).then(() => {
                setShow(false)
                history.replace("/Taches");
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
       //onClick: onUpdate,
    },
];
//--------------Seconde Partie-----------------//
    return (
        <Container>
        <Row className="justify-content-center p-4">Listing taches </Row>
        <Row>
            <Col className="mt-6">
                <ListWithValueLoader  url={'http://localhost:9000/task/list'}
                    cols={[
                        new ColonneObjet("Intitulé", "libelle"),
                        new ColonneObjet("Description", "description"),
                        new ColonneObjet("Personne en charge", "nomUser"),
                        new ColonneObjet("Client", "nomClient"),
                        new ColonneObjet("fournisseur", "nomFournisseur"),
                        new ColonneObjet("statut", "libelleStatut"),
                        new ColonneObjet("Ajouté le:", "dateCreation"),
                        new ColonneObjet("Options", null, actions),
                    ]}
                /> 
            </Col>
        </Row>
        <Row>
        <Col xs={6} className="mt-8 mb-5">
                {<AiIcons.AiOutlinePlus onClick={showFormulaire}/>}
                    {show?( 
                        <Card style={{ 
                            backgroundColor: "rgba(220,220,220, 0.2) " 
                        }}>
                            <FormulaireTask onClick={onClose}/>
                                <Row>
                                    <Col xs={3}></Col>
                                    <Col xs={5}> 
                                        <Button variant="outline-danger" className="m-3"  onClick={onClose}>Annuler</Button>  
                                    </Col>
                                    <Col xs={4}></Col>
                                </Row>
                        </Card>
                    ):null}
                </Col>
        </Row>       
    </Container>
    )
} 
export default TasksPage;
