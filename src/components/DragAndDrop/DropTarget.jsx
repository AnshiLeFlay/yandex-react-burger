import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { ADD_INGREDIENTS_CONSTRUCTOR } from '../../services/actions';
import { useDrop } from 'react-dnd';

//обертка для блоков с ингридиентами и конструктора
const DropTarget = ( props ) => {
    const dispatch = useDispatch();

    const [{ isHover } , drop] = useDrop({
        accept: "item",
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        drop(itemId) {
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

DropTarget.propTypes = {
    children: PropTypes.element
};

export default DropTarget;