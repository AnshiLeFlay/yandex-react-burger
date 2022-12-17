import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { MOVE_INGREDIENTS_CONSTRUCTOR } from '../../services/actions';
import { useDrag, useDrop } from "react-dnd";

import styles from './draganddrop.module.css'; 

const DraggableItem = ( props ) => {
    const { id, content, board, index } = props.data;
    const ref = useRef( null );
    const dispatch = useDispatch();
    
    const [ , drag] = useDrag({
        type: "item",
        item: { id, content, board, index },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });
    //() => { console.log('tyt'); return { id, content, board, index } },
    const [{ isDragConstructor }, dragConstructor] = useDrag({
        type: "constructor-item",
        item: { id, content, board, index },
        collect: monitor => ({
            isDragConstructor: monitor.isDragging()
        })
    });

    const [{ handlerId }, drop] = useDrop({
        accept: "constructor-item",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        drop(itemId, monitor) {
            console.log(ref);
            if (!ref.current) {
                return;
            }

            const dragIndex = itemId.index;
            const hoverIndex = index;
            
            if (dragIndex === hoverIndex) {
                console.log('1');
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                console.log('2');
                return
            }
            
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                console.log('3');
                return
            }
            
            console.log('dragIndex');
            console.log(dragIndex);
            console.log('hoverIndex');
            console.log(hoverIndex);

            //moveCard(dragIndex, hoverIndex)
            dispatch( { type: MOVE_INGREDIENTS_CONSTRUCTOR, itemDrag: dragIndex, itemReplace: hoverIndex } );
  
            //itemId.index = hoverIndex;
            /*
            if ( itemId.board === 'constructor' )
                //dispatch( { type: MOVE_INGREDIENTS_CONSTRUCTOR, item: itemId.id, content: itemId.content } );
                console.log( 'move lock' );
            else dispatch( { type: ADD_INGREDIENTS_CONSTRUCTOR, item: itemId.id, content: itemId.content } );
            */
        },
    });

    const draggableItem = (
        <div ref={drag} className={styles.container_drag}>
            {props.children}
        </div>
    );

    dragConstructor(drop(ref));
    
    const draggableItemConstructor = (
        <div ref={ref} data-handler-id={handlerId}>
            {props.children}
        </div>
    );

    const ghost = (
        <div ref={ref} className={ styles.ghost }>
            {props.children}
        </div>
    );

    const draggableItemContent = (
        board === "ingredients" ? draggableItem : draggableItemConstructor
    );

    return (
        board === 'constructor' ? (
            !isDragConstructor ? draggableItemContent : ghost
        ) : (
            draggableItemContent
        )
    );
};

export default DraggableItem;