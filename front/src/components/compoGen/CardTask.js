import React, {useState, useEffect} from "react";

import Axios from 'axios';
import Constante from './const';
import { Row, Card, ListGroup, ListGroupItem } from 'react-bootstrap'

function CardTask(id_taches){

    const [cardTask, setCardTask] = useState();

    useEffect(() => {
        if (cardTask == null) {
            Axios( Constante.URL_BACK + '/task/list/'+ id_taches,
            {
                method:'GET',
                withCredentials : true,
            }
            ).then((result) =>{
                setCardTask(result.data);
            })
        }
    });
    return ( 
        <Row>
            {cardTask == null ? null : 
            cardTask.map((item, index) =>  (         
                <Card  style={{ width: '18rem' }}>
                   <Card.Body>
                        <Card.Title>
                            {item.libelle}
                        </Card.Title>
                        <Card.Text> {cardTask.description}</Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem> Description: {item.description}</ListGroupItem>
                        <ListGroupItem>Statut de la tache : {item.libelleStatut}</ListGroupItem>
                        <ListGroupItem>Personne en charge : {item.nomUser}</ListGroupItem>
                        <ListGroupItem>Fournisseurs : {item.nomFournisseur}</ListGroupItem>
                        <ListGroupItem>Client: {item.nomClient}</ListGroupItem>
                        <ListGroupItem>Date de création :{item.dateCreation}</ListGroupItem>
                    </ListGroup>
                </Card>
            )
            )}
        </Row>
    )
} 

export default CardTask ;