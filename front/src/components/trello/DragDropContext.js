import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Column from './Column';
import { DragDropContext } from 'react-beautiful-dnd';
import '../../styles/tasks.css';

function DragDrop(idStatut){
    const [taskList, setTaskList] = useState(null);
    const [taskList2, setTaskList2] = useState(null);
    const [showCard, setShowCard] =  useState(false);
    const showCardDetail = () =>{
        setShowCard(!showCard);
    }

    const colWithTask = []
    const [dataCol, setDataCol] = useState(null);
    useEffect(() => {
        if (dataCol == null && taskList == null && taskList2 == null) {
            Axios(
                "http://localhost:9000/statut/liste",
                {
                    method:'GET',
                    withCredentials : true,
                }
            ).then((result) => {
                setDataCol(result.data);
                   
            }).catch(error => {
                console.log(error);
            }); 

            Axios("http://localhost:9000/task/data", 
                {
                    method:'GET',
                    withCredentials : true,
                }
            ).then((result) => {

                setTaskList(result.data);
            }); 

            Axios("http://localhost:9000/task/trello", 
                {
                    method:'GET',
                    withCredentials : true,
                }
            ).then((result) => {
                
                setTaskList2(result.data);
            }); 
        }   
        //commentaire  pr eviter les warnings avc un [] 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[taskList, setTaskList, dataCol, setTaskList2, taskList2]);
    console.log(taskList2);
    const onDragEnd = (result) => {

        const {source, destination, draggableId} = result;
        const start = result.source.droppableId;
        const end = result.destination.droppableId; 
        
        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }
        if (start === end) {
            
            let taskDraggable = 0;
             //recupere ds la liste des taches  l id de la tache. 
            /* taskList.forEach(element => {
                if(element.id === draggableId){
                    taskDraggable = element;
                }
            });
            */
            console.log('Mon 1er tableau')
            console.log(taskList);
            const itemTask = Array.from(taskList);
            //console.log("tab d'objet de taskLits", itemTask);

            console.log('Copie tableau')
            console.log(itemTask);

            taskDraggable = itemTask.splice(result.source.index, 1)[0];
            //console.log("Objet task qu on drag", taskDraggable);

            itemTask.splice(result.destination.index, 0, taskDraggable);
            //console.log("index nouveaux des tasks ", itemTask);

            console.log('Copie tableau update')
            console.log(itemTask);

            const newState = {
                ...taskList,
                
            }

            console.log('Copie tableau update avant réintégration dans 1er tableau')
            console.log(itemTask);
            console.log('Copie tableau update')
            console.log(taskList);
            console.log("this is the end");
            return;

    
           
        } else {
                /*
                const startTaskIds = Array.from(start.taskIds);
                startTaskIds.splice(source.index, 1);
                //mettre a jour la colonne avc les taches dedans 
                const newStart = {
                    ...start,
                    taskIds: startTaskIds
                };
                const finishTaskIds = Array.from(end.taskIds);
                finishTaskIds.splice(destination.index, 0, draggableId);
                //mettre a jour la colonne qui a receptionnée la nvlle task
                const newFinish = {
                    ...end,
                    taskIds: finishTaskIds
                };
                //mise a jour du state
                const newState = {
                    ...listTask,
                    statut: {
                        ...dataCol.id,
                        [newStart.id]: newStart,
                        [newFinish.id]: newFinish
                    }
                };
                // mise a jour des statuts 
                 items.forEach(function (item, index) {
                    if (item.position !== index) {
                        item.idStatut = index;
                        onIdStatutChange(item);
                    }
                });


            setListTask(newState);
            return;
          */  
        }
    }   
    //------------------------------------
    return (
        <div className="tasks">
               <DragDropContext onDragEnd={onDragEnd}>
                {dataCol == null ? null :
                dataCol.map((item, index) =>{
                    const dataTmp = taskList == null ? null : taskList.filter((element ) => { 
                        return element.idStatut === item.id 
                    }) ;
                    colWithTask.push(dataTmp);                
                    console.log(dataTmp);
                    console.log(colWithTask);
                    return (
                        <Column key={index} statut={item.id} libelle={item.libelle}/>
                    )
                })}  
            </DragDropContext>
        </div> 
    );
}
export default DragDrop;
