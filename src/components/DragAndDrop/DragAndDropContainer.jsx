import React from 'react';
//import { useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

//import { DropTarget } from './DropTarget';

//контейнер для BurgerIngredients и BurgerConstructor
const DragAndDropContainer = ( props ) => {
    // Получим все доски из хранилища
    //const boards = useSelector(state => state.boardList.boards)

    return (
        <DndProvider backend={HTML5Backend}>
            { props.content }
        </DndProvider>
    )
};

export default DragAndDropContainer;

/*
{
    // Отрисуем каждую доску и передадим её название в качестве пропса
    boards.map((item, i) => (
        <DropTarget key={i} board={item} />
    ))
}
*/