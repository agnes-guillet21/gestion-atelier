import React, {useState} from "react";
import Label from "./Label";
import Input from "./Input";
import But from './Button';
import { Card, Container, Col, Row} from 'react-bootstrap';
import '../../styles/card.css';
function Formulaires(props){
        
    const [allValues, setAllValues] = useState(props.infos ? props.infos : {});
    console.log(props.infos);
    // ou je peux recup ma valeur de mon onChange 
    const onChange = (value, index ) => {
        setAllValues({
            ...allValues,
            [props.inputs[index].getName()]: value,
        })
    }

    const buttonSubmit = () => {
        props.buttonSubmit.onClick(allValues);
    };

    const buttonOffSubmit = () => {
        props.buttonOffSubmit.onClick(allValues);
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
                        console.log(item);
                        return (
                            <div className="m-2" key={index}>
                                <Label label={item.getLabel()}/>
                                <Input index={index} name={item.getName()} value={allValues[item.getName()]} type={item.getType()} onChange={onChange} />
                            </div>
                        );  
                    })}
                        <Row >
                            <Col xs={6} className="pt-2"> <But nom={props.buttonSubmit.nom} submit={buttonSubmit}/></Col>
                            <Col xs={6} className="pt-2"> <But nom={props.buttonOffSubmit.nom} submit={buttonOffSubmit}/></Col>
                        </Row>
                    </Card>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
}
export default Formulaires;