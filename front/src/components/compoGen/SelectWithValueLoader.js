import React, {useState, useEffect} from "react";
import Axios from 'axios';


function SelectWithValueLoader(props) {
    const [options, setOptions] = useState(null);
    useEffect(() => {
        if (options == null) {
            Axios( props.url,
            {
                method:'GET',
                withCredentials : true,
            }
            ).then((result) =>{
               setOptions(result.data);
            })
        };
    });

    return (
        <div>
            <select name={props.name} onChange={props.onChange}>
                {options == null ? null :
                    options.map((nameOption, index) => {
                    return <option key={index} value={nameOption.id}>{nameOption.libelle}</option>
                    })
                }
            </select>
        </div>
    )
}
export default SelectWithValueLoader;
