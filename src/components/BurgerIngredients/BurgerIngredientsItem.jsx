import React from 'react';
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burgeringredients.module.css'; 

//props.countNumber заменить на state

function BurgerIngredientsItem( props ) {

    return (
        <div className={ styles.burger_item_container }>
            {
                props.counterNumber > 0 &&
                    <Counter count={props.counterNumber} size="default" extraClass="m-1" />
            }
            <img className='pl-4' alt={props.alt} src={props.imgSrc} />
            <p className={ styles.burger_item_caption + " text text_type_digits-default mt-1 mb-1" } >
                <span className='mr-2'>{props.cost}</span><CurrencyIcon type="primary" />
            </p>
            <p className={styles.burger_item_caption + " " + styles.burger_item_height + " text text_type_main-small"}>
                {props.caption}
            </p>
        </div>
    );
  }

BurgerIngredientsItem.propTypes = {
    counterNumber: PropTypes.number,
    imgSrc: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    caption: PropTypes.string.isRequired
};
  
export default BurgerIngredientsItem;