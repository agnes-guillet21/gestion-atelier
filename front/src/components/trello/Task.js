import React,{useState,useEffect} from 'react';
import {Draggable} from 'react-beautiful-dnd';
import '../../styles/task.css';
import * as AiIcons from "react-icons/ai";
import CardTask from '../compoGen/CardTask';
import { Card } from 'react-bootstrap';
/** intitule qui sera draggable
 *  task et index => passer en props ds columns.js
 * */ 

function Task( { task, index, id } ){

    const [showCard, setShowCard] =  useState(false);
    const showCardDetail = () =>{
        setShowCard(!showCard);
    }
    useEffect(() => {
    });
    return (
        <Draggable 
        key= {id}
        draggableId={String(task.id)}
        index={index}
        >
            {provider => (
                < Card
                    {...provider.draggableProps}
                    {...provider.dragHandleProps}
                    ref={provider.innerRef}
                    className="taskItem"
                >
                    {<AiIcons.AiOutlineMore onClick={showCardDetail}/>}
                        {showCard?( 
                            <CardTask/> 
                        ):null}
                        nom: {task.libelleTask} 
                        initiale: {task.initialeUser}
                </Card> 
            )}  
        </Draggable> 
    ); 
}
export default Task;