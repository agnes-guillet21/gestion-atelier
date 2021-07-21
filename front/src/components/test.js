import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Axios from 'axios';
import Column from "./trello/Column";
import '../styles/tasks.css';

function Test() {
 
    const [taskList, setTaskList] = useState(null);
    const [taskTrello, setTaskTrello] = useState(null);
    const [dataCol, setDatasCol] = useState(null);
    const [taskUpdate, setTaskUpdate] = useState(null);
 //--------------------------------------//

            
    useEffect((idStatut) => {
        if (dataCol == null) {
            Axios("http://localhost:9000/statut/liste",
            {
                method:'GET',
                withCredentials : true,
            }
            ).then((result) => {
                    setDatasCol(result.data);
 
            }); 
        }
        if (taskTrello == null) 
        {
            Axios("http://localhost:9000/task/listTask",
                {
                    method:'GET',
                    withCredentials : true,
                }
            ).then((result) => {
                setTaskTrello(result.data);
            }); 
        }

        if (taskList == null) 
        {
            Axios("http://localhost:9000/task/listTrello/" + idStatut,
                {
                    method:'GET',
                    withCredentials : true,
                }
            ).then((result) => {
                setTaskList(result.data);
                   
            }); 
        }
        /*
        if (taskUpdate == null)
        {
            Axios("http://localhost:9000/task/update",
            {
                methode : "PUT",
                withCredentials : true,
            }
            ).then((result) => {
                setTaskUpdate(result.data);
            });    
        }  
        */    

    },[taskList ,dataCol, taskTrello,taskUpdate, setTaskTrello, setDatasCol, setTaskList, setTaskUpdate]); 


    const onDragEnd = (result) => {
        const {source, destination, draggableId} = result; 
        //test reorder


        const reorder = (taskTrello, startIndex, endIndex) => {
            const result = Array.from(taskTrello);
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed);
            return result;
          };
        
        if (!destination) {
            return null;
          }
        if (destination.droppableId === source.droppableId && destination.index === source.index) {  
            return null;
        }

    //----------si on bouge les elements ds la meme colonne ------------   
        const start = taskList[source.droppableId];
        const finish = taskList[destination.droppableId];
        
        console.log(start);
        console.log( finish);

        if (start === finish) {
  
            const newTaskIds = Array.from(start);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId)

            const newColumn = {
                ...start,
                taskIds : newTaskIds
            };
            
            const newState = {
                ...this.state,
                columns: {
                  ...this.state.columns,
                  [newColumn.id]: newColumn
                }
            };
              
            setTaskTrello(newState);
              return ;
        }

     //fin de fction onDragEnd   
    }      


            // on recupere les id  des taches actuelles, 
            //const newTaskIds = Array.from(column);
            
            // on remplace les places ds  Array


    /*
      //-----------sur plusieurs colonnes  on moove les diff taches
    const startTaskIds = Array.from(start.taskListe.id);// recupere tous les id de la 1 colonne
    startTaskIds.splice(source.index, 1); // pr remplacer
    const newStart = {
        ...start, // mise a jour du tableau
        task : startTaskIds, 
    }
    const finishTaskIds = Array.from(finish.taskListe.id);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
        ...finish,
        task: finishTaskIds, 
    }
    const newState = {
        ...dataTasks,
            ...dataTasks.columns,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish,
     
    }
    setDatasTasks(newState); 


*/

    return (
        <div className="tasks">
            <DragDropContext onDragEnd={onDragEnd}>   
                {dataCol == null?null :
                    dataCol.map((item, index) =>{
                        return (
                            <Column  key={index} statut={item.id}/>
                        )
                    })
                }
            </DragDropContext>
        </div>    
    );
}

export default Test;