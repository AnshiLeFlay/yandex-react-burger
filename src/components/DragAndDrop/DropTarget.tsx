import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { ADD_INGREDIENTS_CONSTRUCTOR } from '../../services/actions';
import { useDrop } from 'react-dnd';

interface IDropTargetProps {
    children?: React.ReactNode | JSX.Element | string; 
}

//обертка для блоков с ингридиентами и конструктора
const DropTarget: FC<IDropTargetProps> = ( props ) => {
    const dispatch: any = useDispatch();

    const [ { isHover } , drop ] = useDrop( {
        accept: "item",
        collect: monitor => ( {
            isHover: monitor.isOver(),
        } ),
        drop( itemId: any ) {
            dispatch( { type: ADD_INGREDIENTS_CONSTRUCTOR, item: itemId.id, content: itemId.content } );
        },
    } );

    const borderColor = isHover ? 'lightgreen' : 'transparent';

    return (
        <div ref={ drop } style={ { borderColor } }>
            { props.children }
        </div>
    )
};

export default DropTarget;