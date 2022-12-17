import React from 'react';
import { useDispatch } from 'react-redux';
import { ADD_INGREDIENTS_CONSTRUCTOR } from '../../services/actions';
import { useDrop } from 'react-dnd';

//import { DraggableItem } from './DraggableItem';
//import styles from './draganddrop.module.css'; 

//обертка для блоков с ингридиентами и конструктора

const DropTarget = ( props ) => {
    const dispatch = useDispatch();
    //const items = useSelector(state => state.itemList.items)

    const [{ isHover } , drop] = useDrop({
        accept: "item",
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        drop(itemId) {
            //здесь надо вызвать добавление в массив конструктора
            /*dispatch({
                type: UPDATE_TYPE,
                ...itemId,
                board
            });*/
            console.log('itemId');
            console.log(itemId);
            dispatch( { type: ADD_INGREDIENTS_CONSTRUCTOR, item: itemId.id } );
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

/*
<DropTarget>
<DraggableItem key={item.id} data={item}>
//ingredient
</DraggableItem>
</DropTarget>


{items
    // Получим массив животных, соответствующих целевому элементу
    .filter(item => item.board === board)
    // Отрисуем массив
    .map(item => <DraggableItem key={item.id} data={item} />)
}
*/