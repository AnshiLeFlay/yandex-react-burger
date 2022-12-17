import React from 'react';
import { useDispatch } from 'react-redux';
import { ADD_INGREDIENTS_CONSTRUCTOR } from '../../services/actions';
import { useDrop } from 'react-dnd';

//import { DraggableItem } from './DraggableItem';
//import styles from './draganddrop.module.css'; 

//обертка для блоков с ингридиентами и конструктора
const DropTarget = ( props ) => {
    const dispatch = useDispatch();

    const [{ isHover } , drop] = useDrop({
        accept: "item",
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        drop(itemId) {
            //if ( itemId.board === 'constructor' )
                //dispatch( { type: MOVE_INGREDIENTS_CONSTRUCTOR, item: itemId.id, content: itemId.content } );
                //console.log( 'move lock' );
            //else 
            dispatch( { type: ADD_INGREDIENTS_CONSTRUCTOR, item: itemId.id, content: itemId.content } );
        },
    });

    const borderColor = isHover ? 'lightgreen' : 'transparent';

    return (
        <div ref={drop} style={{borderColor}}>
            { props.children }
        </div>
    )
};

export default DropTarget;