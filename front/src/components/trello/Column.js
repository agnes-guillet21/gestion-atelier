import React,{useState, useEffect} from 'react';
import Axios from 'axios';
import Task from './Task';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import '../../styles/column.css';
import { Card } from 'react-bootstrap';


function Column(props) {
 //--------------Liste Colonnes------------------------//
    const [taskList, setTaskList] = useState(props.dataTask);

    useEffect(() => {
        // faire un seul if pr verifier le premier
        if ( taskList == null)  { 
            Axios("http://localhost:9000/task/listTrello/"+ props.statut,
                {
                    method:'GET',
                    withCredentials : true,
                }
            ).then((result) => {
                setTaskList(result.data);
                //props.changeData(result.data);
            }); 
        }
    },[ taskList, setTaskList,props.idTask, props]); 

//---------------------visuel---------------
    return (
        <div className="columnTask" >
            <h3>{props.libelle}</h3>  
            <Droppable droppableId={String(props.statut)} isDragDisabled={false}>
                { (provider, snapshot) => (
                    <div 
                        {...provider.droppableProps}
                        ref = {provider.innerRef}
                        className="taskList"
                    >
                        {taskList == null ? null:
                            taskList.map((item, index) => {
                                return (
                                    <Task key={item.id} index={index} task={item}/>
                                )
                            })
                        } 
                        {provider.placeholder}
                    </div>
                )}
            </Droppable> 
        </div>
    );
}
export default Column;