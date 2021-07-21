import React, {useState} from "react";
import { useHistory } from 'react-router-dom';
import Constante from '../compoGen/const';
import ListWithValueLoader from '../compoGen/ListWithValueLoader';
import SelectWithValueLoader from "./SelectWithValueLoader";
import { Button, Card, Container, Col, Row} from 'react-bootstrap';
import * as AiIcons from "react-icons/ai";
import '../../styles/card.css';
import Axios from 'axios';
import Label from "./Label";
import Input from "./Input";
import But from './Button';
function FormulairesWithSelect(props){
    
    
    let history = useHistory();
    const [libelleUser, setLibelleUser] = useState(null);
    const [initialeUser, setInitialeUser] = useState(null);
    const [dateCrea, setDateCrea] = useState(null);
    const [grade, setGrade] = useState(null);
    const [dataUser, setDataUser] = useState(null);
    const [show, setShow] =  useState(false);   
    const [allValues] = useState({});

    const onClose = () => setShow(false);
    // ou je peux recup ma valeur de mon onChange 
    
    const onChange = (value, index ) => {
        allValues[props.inputs[index].getName()] = value;
        console.log(allValues);
    }


    const showFormulaire = () =>{
        setShow(!show);
    }
    
    const buttonSubmit = () => {
        props.buttonSubmit.onClick(allValues);
    };

    const buttonOffSubmit = () => {
        props.buttonOffSubmit.onClick(allValues);
    };





/*
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
            setShow(false);
        });
    };
    */
    return (
        <Container>
        <Row>
            <Col></Col>
            <Col>
                <Card 
                    style={{ 
                        backgroundColor: "rgba(220,220,220, 0.2)" 
                    }}
                >
                {props.inputs.map((item, index) => {
                    console.log(item);
                    return (
                        <div className="m-2" key={index}>
                            <Label label={item.getLabel()}/>
                            <Input index={index} name={item.getName()} value={allValues[item.getName()]} type={item.getType()} onChange={onChange} />
                        </div>
                    );  
                })}
                {props.selects.map((itemSelect, index) => {
                    return ( 
                        <> 
                            <Label label={itemSelect.getLabel()}/>
                            <SelectWithValueLoader url={itemSelect.getUrl()} onChange={onChange} />
                        </>
                    );  
                })}
                </Card>
            </Col>
            <Col></Col>
        </Row>
    </Container>
    );
}
export default FormulairesWithSelect;