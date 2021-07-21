import Axios from 'axios';
import React, {useState, useEffect} from "react";
import Constante from './compoGen/const';
import SelectWithValueLoader from './compoGen/SelectWithValueLoader';
import { useHistory } from 'react-router-dom';
import {  Form, Container , Col, Row, Button } from 'react-bootstrap';

function FormulaireTask(){
    const [libelleTask, setLibelleTask] = useState(null);
    const [descriptionTask, setDescriptionTask] = useState(null);
    const [dateCrea, setDateCrea] = useState(null);
    const [idClient, setIdClient] = useState(null);
    const [idUser, setIdUser] = useState(null);
    const [idFournisseur, setIdFournisseur] = useState(null);
    const [idStatut, setIdStatut] = useState(null);
    const [dataTask, setDataTask] = useState(null);
    let history = useHistory();
    
    useEffect(() => {
        if (dataTask == null) {
            Axios(
                Constante.URL_BACK + '/task/list',
                {
                    method:'GET',
                    withCredentials : true,
                }
            ).then((result) => {
                setDataTask(result.data);
                console.log(result.data);
            });
        };
    });
    const submit = () => {
        Axios(
            Constante.URL_BACK + "/task/ajout", 
            {
            method:'POST',
            withCredentials : true, 
            data: JSON.stringify({
                libelleTask: libelleTask, 
                descriptionTask: descriptionTask,
                dateCrea: dateCrea,
                idClient: idClient,
                idUser: idUser,
                idFournisseur: idFournisseur,
                idStatut: idStatut,
            }),
            headers : {
                'Content-type': 'application/json'
            }
        }).then(()=>{
            history.replace("/Taches");
            history.go(0);
            alert("successful");
        });
    }

    return (
        <Container>
            <Row>
                <Col xs={3}></Col>  
                <Col xs={6}>
                    <Form className="p-2"> 
                        <Form.Label>Nom : </Form.Label>
                        <Form.Control
                            type="text"
                            name="libelleTask" 
                            onChange={(e)=>{
                            setLibelleTask(e.target.value);
                            }}  
                        />
                        <Form.Label>Description : </Form.Label>
                        <Form.Control
                            type="text"
                            name="descriptionTask"
                            onChange={(e)=>{
                            setDescriptionTask(e.target.value);
                            }}
                        />
                        <Form.Label>Date : </Form.Label>
                        <Form.Control
                            type="Date"
                            name="dateCrea" 
                            onChange={(e)=>{
                            setDateCrea(e.target.value);
                            }}
                        />
                        <div className="clients">
                            <Form.Label>Clients : </Form.Label> {/*props parents */}
                            <SelectWithValueLoader url={Constante.URL_BACK + '/client/listSelect'} onChange={(e)=>{setIdClient(e.target.value)}} 
                            />
                        </div>
                        <div className="utilisateurs">
                            <Form.Label>Utilisateurs : </Form.Label>  
                            <SelectWithValueLoader url={Constante.URL_BACK + '/user/listSelect'} onChange={(e)=>{setIdUser(e.target.value)}} />
                        </div>
                        <div className="fournisseur">
                            <Form.Label>Fournisseurs: </Form.Label>
                            <SelectWithValueLoader url={Constante.URL_BACK + '/fournisseur/listSelect'} onChange={(e)=>{setIdFournisseur(e.target.value)}} />
                        </div>
                        <div className="statut">
                            <Form.Label>Statut : </Form.Label>
                            <SelectWithValueLoader url={Constante.URL_BACK + '/statut/liste'} onChange={(e)=>{setIdStatut(e.target.value)}} />
                        </div>
                        <Row  className="jusitfy-content-around">    
                            <Col xs={6}>
                                <Button variant="outline-info" className="mt-3"  onClick={submit}>Ajouter</Button>
                            </Col> 
                        </Row>
                    </Form>
                </Col> 
            </Row>
        </Container>
    )
}

export default  FormulaireTask ;