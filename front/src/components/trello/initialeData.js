import Axios from 'axios';

function Data () {
    // const [taskListe, setTaskListe] = useState(null);

    return Axios("http://localhost:9000/task/Data",
        {
            method:'GET',
            withCredentials : true,
        }
    ).then((result) => {
        let structureTask = null;
        return result.data.map((element , index ) => {
            structureTask = (
                    {
                        idTask : element.id, 
                        libelleTask : element.libelleTask,
                        idStatut : element.idStatut, 
                        libelleStatut : element.libelleStatut, 
                        initialeUser : element.initialeUser,                
                    }
            );
            return structureTask  
        }); 
    });
/*
    Axios(
        "http://localhost:9000/statut/liste",
        {
            method:'GET',
            withCredentials : true,
        }
    ).then((result) => {
            let structureCol = null;
            return result.data.map((element , index ) => {
                structureCol = (
                    {
                        idStatut : element.id, 
                        libelleStatut: element.libelle,                
                    }
                );
                return structureCol  
            });
        });
        */
}
export default Data;