import React from 'react';
import { useDrag } from "react-dnd";

import styles from './draganddrop.module.css'; 

const DraggableItem = ( props ) => {
    const { id, content } = props.data;
    
    const [{ isDrag }, drag] = useDrag({
        type: "item",
        item: { id },
        content: { content },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    // Отображение DraggableAnimal в целевом элементе "default"
    const draggableItem = (
        <div ref={drag} className={styles.animalElement}>
            {props.children}
        </div>
    );
    
    /*
    // Отображение DraggableAnimal в других целевых элементах
    const draggableItemCard = (
        <div ref={drag} className={styles.item}>
            {data.content}
        </div>
    );

    // Проверяем, где сейчас находится карточка
    const draggableItemContent = (
        board === "default" ? draggableItemPreview : draggableItemCard
    );
    */

    return (
        draggableItem
    );
};

export default DraggableItem