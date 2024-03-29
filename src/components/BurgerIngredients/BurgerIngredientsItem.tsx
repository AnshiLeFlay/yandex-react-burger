import React, { FC, MouseEventHandler } from 'react';

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burgeringredients.module.css'; 

interface IBurgerIngredientsItemProps {
    counterNumber: number;
    imgSrc: string;
    alt: string;
    cost: number;
    caption: string;
    handleClick?: MouseEventHandler;
}

const BurgerIngredientsItem: FC<IBurgerIngredientsItemProps> = ( props ) => {

    return (
        <div onClick={ props.handleClick } >
            {
                props.counterNumber > 0 &&
                    <Counter count={ props.counterNumber } size="default" extraClass="m-1" />
            }
            <img className='pl-4' alt={ props.alt } src={ props.imgSrc } />
            <p className={ styles.burger_item_caption + " text text_type_digits-default mt-1 mb-1" } >
                <span className='mr-2'>{ props.cost }</span><CurrencyIcon type="primary" />
            </p>
            <p className={ styles.burger_item_caption + " " + styles.burger_item_height + " text text_type_main-small" }>
                { props.caption }
            </p>
        </div>
    );
}
  
export default BurgerIngredientsItem;