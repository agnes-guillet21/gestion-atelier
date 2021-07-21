import Axios from 'axios';
import React, {useState, useEffect} from "react";
import Constante from './compoGen/const';
import SelectWithValueLoader from './compoGen/SelectWithValueLoader';
import { useHistory } from 'react-router-dom';
import {  Form, Container , Col, Row, Button } from 'react-bootstrap';

function FormulaireUser(props){

    let history = useHistory();
    const [libelleUser, setLibelleUser] = useState(null);
    const [initialeUser, setInitialeUser] = useState(null);
    const [dateCrea, setDateCrea] = useState(null);
    const [grade, setGrade] = useState(null);
    const [dataUser, setDataUser] = useState(null);
    const [show, setShow] =  useState(false);

    /*
    const [allValues, setAllValues] = useState(props.infos ? props.infos : {});
    console.log(props.infos);
    // ou je peux recup ma valeur de mon onChange 
    const onChange = (value, index ) => {
        setAllValues({
            ...allValues,
            [props.inputs[index].getName()]: value,
        })
    }
    */
    const onClose = () => setShow(false);
    const showFormulaire = () =>{
        setShow(!show);
    }
    useEffect(() => {
        if (grade == null) {
            Axios(
                Constante.URL_BACK + '/task/list',
                {
                    method:'GET',
                    withCredentials : true,
                }
            ).then((result) => {
                setGrade(result.data);
                console.log(result.data);
            });
        };
    });
    const submit = ()=>{ 
        
        Axios( Constante.URL_BACK + "/user/ajout", 
        {
            method: 'POST',
            withCredentials : true, 
            data: JSON.stringify({
                libelleUser: libelleUser,
                initialeUser: initialeUser, 
                dateCrea: dateCrea,
                grade: Number(grade),
               
        }),
       
        headers : {
            'Content-type': 'application/json'
        }
        }).then(()=>{
            history.replace("/Utilisateurs");
            history.go(0);

            setShow(false);
            
        });
    };

    const onDelete = (idUser) => {
        Axios (Constante.URL_BACK + "/user/suppression/" + idUser,
            {
                method: 'DELETE',
                withCredentials : true, 
                headers : {
                    'Content-type': 'application/json'
                }
            }).then(() => {
       
        });
    }
    const onUpdate = (idUser, value) =>{
        console.log(idUser);
         Axios(Constante.URL_BACK + "/user/modification/" + idUser,
         {
             method: 'PUT',
             withCredentials : true,
             data: JSON.stringify({
                libelleUser: libelleUser,
                initialeUser: initialeUser, 
                dateCrea: dateCrea,
                grade: Number(grade),}), 
             headers : {
                 'Content-type': 'application/json'
             }
         }).then((result) => {
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
                            name="libelleUser" 
                            onChange={(e)=>{
                            setLibelleUser(e.target.value);
                            }}
                        />
                        <Form.Label>Initiales : </Form.Label>
                        <Form.Control
                            type="text"
                            name="initialeUser" 
                            onChange={(e)=>{
                            setInitialeUser(e.target.value);
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
                            <Form.Label>Grade : </Form.Label> {/*props parents */}
                            <SelectWithValueLoader url={Constante.URL_BACK + '/grade/list'} onChange={(e)=>{setGrade(e.target.value)}} />
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

export default  FormulaireUser ;