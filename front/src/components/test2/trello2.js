import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Axios from 'axios';
import Column from './column2';
import Data from '../trello/initialeData';

function Trello2(idStatut) {

  //list des taches   ==const [structure, setStructure] = useState( initial data => ya un id et un content);

  const [datas , setDatas] =  useState(null);
  const [dataCol, setDatasCol] = useState(null);
  const [taskTrello, setTaskTrello] = useState({});
  const [taskByIS, setTaskByIS] = useState([]);

  useEffect(() => { 
        (async () => { 
            setDatas(await Data()); 
        })() 
        }, []) 
        ;
    /*
    const [dataTask, setDataTask] = useState([])
    listes des colonnes const [sections, setSections] = useState([]);
    */

  
    useEffect(() => {
        if (dataCol == null) {
              Axios(
                  "http://localhost:9000/statut/liste",
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
                Axios("http://localhost:9000/task/listTrello/"+ idStatut,
                    {
                        method:'GET',
                        withCredentials : true,
                    }
                ).then((response) => response.json())
                //.then((data) => setTaskTrello({ items: data }));
            }
    }); 
  
    
    const onDragEnd = ((result) => {
        const {source, destination} = result; 
        
        const getList = () => (taskTrello);
        
        const reorder = (taskTrello, startIndex, endIndex) => {// helper function to reordering the result
            const result = Array.from(taskTrello);
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed);
            return result;
       };

       
  // Moves an item from one list to another list.
        const move = (source, destination, droppableSource, droppableDestination) => {
            const sourceClone = Array.from(source);
            const destClone = Array.from(destination);
            const [removed] = sourceClone.splice(droppableSource.index, 1);
            destClone.splice(droppableDestination.index, 0, removed);
            const result = {
            [droppableSource.droppableId]: sourceClone,
            [droppableDestination.droppableId]: destClone,
            };
            return result;
        };
  
      // dropped outside the list
      if (!destination) 
      return;

      // dropped in the same column
      if (destination.droppableId === source.droppableId) {  
        
        reorder(
          getList(source.droppableId),
          source.index,
          destination.index
         
        );
        const newState = {
            ...taskTrello,
             index : [destination.index]
            }
      
         setTaskTrello(newState);
          console.log("ligne 422");
          return;
    
      
      // dropped in the other column
      } else {
        const result = move(
          getList(source.droppableId),
          getList(destination.droppableId),
          source,
          destination
        );

        setDatasCol(result.dataCol);
        setTaskTrello(result.taskTrello);
      }
    },
    [dataCol, taskTrello]
  );
  return (
    <div className="container">
        <DragDropContext onDragEndResponder={onDragEnd}>
            {dataCol == null?null :
            dataCol.map((item, index) =>{
                const dataTmp = datas == null ? null : datas.filter((element ) => { 
                    return element.idStatut === item.id; 
                }) ;
                //que je fasse un truc pr recuperer les id statuts 
                return (
                        <Column  key={index}  dataTasks={dataTmp} libelle={item.libelle} statut={item.id}/>
                    )
            })}
        </DragDropContext>
    </div>
  );
}
export default Trello2;
