import React, {useState, useEffect} from "react";
import Axios from "axios";
import * as AiIcons from "react-icons/ai";
import Input from '../classes/InputClass';
import Constante from '../compoGen/const';
import { useHistory } from 'react-router-dom';
import Formulaires from "../compoGen/Formulaires";
import ColonneObjet from '../classes/ColonneClass';
import ListWithValueLoader from '../compoGen/ListWithValueLoader';
import { Container, Row, Col, Card} from 'react-bootstrap';
function Grade(id){

    const [show, setShow] =  useState(false);
    const [gradeList, setGradeList] = useState(null);
    const [infos, setInfos ] = useState(null);
    let history = useHistory();
        
    const showFormulaire = () =>{
        setShow(!show);
    }

    const onClose = () => setShow(false);
   
    const submit = (value) => {
        Axios(
        Constante.URL_BACK + "/grade/ajout",
        {
            method: 'POST',
            withCredentials : true, 
            data: JSON.stringify(value),
            headers : {
                'Content-type': 'application/json' 
            }
        }).then((result) => {
            setGradeList(result.data);
            setShow(false)
            history.replace("/Grades");
            history.go(0);
        });
    };

    const onClickUpdate = (idGrade, value) => {
        console.log('grade :', idGrade, value);
        // setShow(true);
        setInfos(value);
        return ;
    }  

    const onUpdate = (value) =>{
        console.log(value);
         Axios(Constante.URL_BACK + "/grade/modification/" + value.id,
         {
             method: 'PUT',
             withCredentials : true,
             data: JSON.stringify(value), 
             headers : {
                 'Content-type': 'application/json'
             }
         }).then((result) => {
             history.replace("/Grades");
             history.go(0);
         });
     }

    const onDelete = (id) =>{
            Axios("http://localhost:9000/grade/suppression/"+ id, {
                method: 'DELETE',
                withCredentials : true, 
                headers : {
                    'Content-type': 'application/json' 
                }
            }).then(() => {
                console.log("suppression reussie " );
                history.replace("/Grades");
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
            <Row className="justify-content-center p-4"> Grades </Row>
            <Row>
                
                <Col className="m-5">
                    <ListWithValueLoader  url={Constante.URL_BACK + '/grade/listAll'}
                    cols={[
                        new ColonneObjet("Intitulé", "libelle"),
                        new ColonneObjet("Ajouté le", "dateCreation"),
                        new ColonneObjet("Options", null, actions), 
                    ]}
                    />
                </Col>
                <Col className="mt-4">
                {<AiIcons.AiOutlinePlus onClick={showFormulaire}/>}
                    {show?(  
                        < Formulaires url={Constante.URL_BACK + '/grade/ajout'}
                            inputs={[
                                new Input("text","libelle", " Intitulé : "),
                                new Input("date","dateCrea", " Crée le : "),
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
                        < Formulaires infos={infos} url={Constante.URL_BACK + '/grade/modification/'+ id}
                            inputs={[
                                new Input("text", "libelle", "Intitulé : "),
                                new Input("date", "dateCrea", " Date : "),
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

export default Grade;