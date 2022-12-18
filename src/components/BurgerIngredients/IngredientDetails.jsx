import React from 'react';
import { useSelector } from 'react-redux';

import styles from './burgeringredients.module.css'; 

function IngredientDetails() {
    const currentItem = useSelector( store => store?.ingredients?.currentIngredient );

    return (
        <div className={styles.ingredients_modal}>
            <img alt={currentItem.name} src={currentItem.image} />
            <p className="text text_type_main-small mt-4 mb-8">{currentItem.name}</p>
            <div className={styles.nutrients + ' mb-15'}>
                <p className='text text_type_main-small text_color_inactive mr-5'>Калории, ккал<br/><span className='text_type_digits-default'>{currentItem.calories}</span></p>
                <p className='text text_type_main-small text_color_inactive mr-5'>Белки, г<br/><span className='text_type_digits-default'>{currentItem.proteins}</span></p>
                <p className='text text_type_main-small text_color_inactive mr-5'>Жиры, г<br/><span className='text_type_digits-default'>{currentItem.fat}</span></p>
                <p className='text text_type_main-small text_color_inactive'>Углеводы, г<br/><span className='text_type_digits-default'>{currentItem.carbohydrates}</span></p>
            </div>
        </div>
    )
}

export default IngredientDetails;