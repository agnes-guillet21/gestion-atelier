import React,{useState, useEffect} from 'react';
import Axios from 'axios';
import '../../styles/column.css';
import {Droppable} from 'react-beautiful-dnd';
import Task from '../trello/Task';


function Column(props) {

 //--------------Liste Colonnes------------------------//
    
    const [dataCol, setDatasCol] = useState(null);
    const [taskList, setTaskList] = useState(null);
        
    useEffect(() => {
        // faire un seul if pr verifier le premier

        if (taskList == null) 
        {
            Axios("http://localhost:9000/task/listTrello/" + props.statut,
                {
                    method:'GET',
                    withCredentials : true,
                }
            ).then((result) => {
                setTaskList(result.data);

            }); 
        }  
    },[taskList ,dataCol, setDatasCol, setTaskList,props.statut]); 

   /*fction changmt premier passage
 const [runEffect, setRunEffect] = useState(true);
  
   function runEffect(){
    setRunEffect(!runEffect)
   }
   */
//---------------------visuel---------------

return (
    <div className="columnTask" >
        <h3>{props.libelle}</h3>  
        <Droppable droppableId={props.statut.toString()} isDragDisabled={false}>
            { (provider, snapshot) => (
                <div 
                    {...provider.droppableProps}
                    ref = {provider.innerRef}
                    className="taskList"
                >       
                    {taskList == null ? null:
                        taskList.map((item, index) => {
                            return (
                                <Task key={item.id} index={index}  task={item}/>
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