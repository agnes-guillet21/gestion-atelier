import React, {useState} from "react";
import Label from "./Label";
import Input from "./Input";
import But from './Button';
import { Card, Container, Col, Row} from 'react-bootstrap';
import Axios from "axios";
import Constante from '../compoGen/const';
import '../../styles/card.css';
function FormulaireEdit(props){


      const [allValues, setAllValues] = useState({});
      const onChange = (value, index ) => {
        allValues[props.inputs[index].getName()] = value;
    }
      const buttonSubmit = () => {
        props.buttonSubmit.onClick(allValues);
    };
    const buttonOnSubmit = () => {
        props.buttonOnSubmit.onClick(allValues);
    };
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
                        return (
                            <div className="m-2" key={index}>
                                <Label label={item.getLabel()}/>
                                <Input index={index} name={item.getName()} value={item.getValue()} type={item.getType()} onChange={onChange} />
                            </div>
                        );  
                    })}
                        <Row >
                            <Col xs={6} className="pt-2"> <But nom={props.buttonSubmit.nom} submit={buttonSubmit}/></Col>
                            <Col xs={6} className="pt-2" > <But nom={props.buttonOnSubmit.nom} submit={buttonOnSubmit}/></Col>
                        </Row>
                    
                    </Card>
                   
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
}
export default FormulaireEdit;