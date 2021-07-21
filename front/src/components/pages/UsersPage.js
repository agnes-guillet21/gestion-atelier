import React, {useState, useEffect} from "react";
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import Constante from '../compoGen/const';
import * as AiIcons from "react-icons/ai";
import {Container, Row, Col, Card, Button } from 'react-bootstrap'
import ColonneObjet from '../classes/ColonneClass';
import ListWithValueLoader from '../compoGen/ListWithValueLoader';
import FormulaireUser from "../FormulaireUser";
/**
 * let history => utiliser pr la navigation
 * dat/SetData => state de recupération de données en BDD
 * requete Ajax pour le formulaire
 * Useeffect renvoie une liste, utilisation d'un composant Tableau pour afficher cette liste
 * @returns 
 */
function User(){
                

    let history = useHistory();
    const [libelleUser, setLibelleUser] = useState(null);
    const [initialeUser, setInitialeUser] = useState(null);
    const [dateCrea, setDateCrea] = useState(null);
    const [grade, setGrade] = useState(null);
    const [dataUser, setDataUser] = useState(null);
    const [show, setShow] =  useState(false);
    const [infos, setInfos ] = useState(null);

    useEffect(() => {
        if (dataUser == null) {
            Axios( Constante.URL_BACK + '/user/list',
            {
                method:'GET',
                withCredentials : true,
            }
            ).then((result) =>{
                setDataUser(result.data);
               
            })
        }
        if (grade == null) {
            Axios( Constante.URL_BACK + '/grade/list',
            {
                method:'GET',
                withCredentials : true,
            }
            ).then((result) =>{
                setGrade(result.data);
               
            })
        }
        
    })


    const onDelete = (idUser) => {
        Axios (Constante.URL_BACK + "/user/suppression/" + idUser,
            {
                method: 'DELETE',
                withCredentials : true, 
                headers : {
                    'Content-type': 'application/json'
                }
            }).then(() => {
                history.replace("/Utilisateurs");
                history.go(0);
        });
    }
    const onUpdate = (idUser, value) =>{
        console.log(idUser);
         Axios(Constante.URL_BACK + "/user/modification/" + idUser,
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

    const onClose = () => setShow(false);
    const showFormulaire = () =>{
        setShow(!show);
    }


    const optionsSelect = [];
    const uploadOptions = () =>{
        {grade.map((itemGrade, indexGrade) => {
            optionsSelect.push(itemGrade);
        })
        console.log(optionsSelect);
        return optionsSelect;
        
        }
    }
   
     //------------------JSON pr la 3 col----------------

   let actions = [
        {
            icone: "suppression",
            onClick: onDelete ,
        },
        {
            icone: "edit",
            onClick: onUpdate,
        },
    ];
//--------------Seconde Partie-----------------//
    return(
        <Container>
            <Row className="justify-content-center p-4"> 
                <Col>

                </Col>
                <Col xs={7}>
                    <span>Utilisateurs</span>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Col className="mt-4">
                        <ListWithValueLoader  url={Constante.URL_BACK + '/user/list'}
                            cols={[
                                new ColonneObjet("Utilisateurs", "libelle"),
                                new ColonneObjet("Initiales", "initiale"),
                                new ColonneObjet("Grade", "grade"),
                                new ColonneObjet("Ajouté le :", "dateCreation"),
                                new ColonneObjet("Options", null, actions),
                            ]}
                        />
                    </Col>
                </Col>
            </Row>
            <Row>   
            <Col xs={6} className="mt-8 mb-5"> Ajouter un Utilisateur
                {<AiIcons.AiOutlinePlus onClick={showFormulaire}/>}
                    {show?( 
                        <Card style={{ 
                            backgroundColor: "rgba(220,220,220, 0.2) " 
                        }}>
                      <FormulaireUser onClick={onClose}/>
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
    );
}
export default User;