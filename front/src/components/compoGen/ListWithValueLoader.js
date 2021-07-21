import React, {useState, useEffect} from "react";
import Axios from 'axios';
import { Table } from 'react-bootstrap'
import Item from './Item';
function ListWithValueLoader(props) {

    const [rows, setRows] = useState(null);
    useEffect(()=>{
        if (rows == null) {
            Axios(
                props.url,
                {
                    method:'GET',
                    withCredentials : true,
                } 
            ).then((result) =>{
                setRows(result.data);
            });
        }
    });

    const [allValues, setAllValues] = useState({});
    // ou je peux recup ma valeur de mon onChange 
    const onChange = (value, index ) => {
        allValues[props.inputs[index].getName()] = value;
    }
    return (
        <div>
            {rows == null ? null :
                <Table hover>
                    <thead>
                        <tr> 
                            {props.cols.map((item, index) => {
                                return (
                                <Item key={index} value={item.getNom()}/>
                                );  
                            })}
                        </tr>
                    </thead>    
                    <tbody>       
                        {rows == null ? null :
                            rows.map((item, index) => {
                                return(
                                    <tr key={index}>
                                        {props.cols.map((item2, index2) => {
                                            return (
                                                <Item key={index2} value={item[item2.getValue()]} id={item.id} options={item2.getActions()} allData={item} />
                                            )
                                        
                                        })} 
                                    </tr>  
                                )
                            }
                        )}
                    </tbody>              
                </Table>

            }
        {/*
          let active = 1;
    let items = [];
    for (let number = 1; number <= items.lenght; number++) {
      items.push(
        <Pagination.Item key={number} active={number === active}>
          {number}
        </Pagination.Item>,
      );}
            <Pagination>
                <Pagination.First variant="outline-info"/>
                <Pagination.Item active >{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Item disabled>{3}</Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Item>{items.lenght}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
            </Pagination>
        */}
        </div>
        
    )
}
export default ListWithValueLoader;
