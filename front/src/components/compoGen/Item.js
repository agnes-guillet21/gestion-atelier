import React from "react";
import * as AiIcons from "react-icons/ai";

function getIcon(onCustomClick, icone, id, value) {
    // faire un switch en fction 
    const onClick = () =>{
        onCustomClick(id, value)
    }
    switch (icone) {
        case 'suppression': 
            return <AiIcons.AiOutlineDelete onClick={onClick}/>
        case 'edit':
            return <AiIcons.AiOutlineEdit onClick={onClick} />
        default:
            console.log('default');
    }
}
function Item(props){
    if (props.options != null) {
        return( 
            <td>
                {props.options.map((item, index) => {
                    return getIcon(item.onClick, item.icone, props.id, props.allData);
                })}
            </td> 
        )
    } else {
        return( 
            <td>
                {props.value} 
            </td> 
        )
    }
        
}
export default Item;