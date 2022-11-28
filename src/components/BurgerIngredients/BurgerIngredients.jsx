import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerIngredientsItem from './BurgerIngredientsItem';
//import styles from './burgeringredients.module.css'; 

import {burgersData} from '../../utils/data';

function BurgerIngredients() {
    const [current, setCurrent] = React.useState('one');

    return (
        <>
            <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
            <div style={{ width: 'fit-content' }}>
                <div style={{ display: 'flex' }}>
                    <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                    </Tab>
                    <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                    </Tab>
                    <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                    </Tab>
                </div>
            </div>
            <div style={{ overflow: 'scroll' }}>
                <p className="text text_type_main-medium mt-10 mb-6">Булки</p>
                <div className='pl-4'>
                    { burgersData.filter(filterElem => filterElem.type === 'bun').map((elem, index) => <BurgerIngredientsItem key={index} imgSrc={elem.image} cost={elem.price} caption={elem.name} counterNumber={0} /> )}
                </div>
                <p className="text text_type_main-medium mt-10 mb-6">Соусы</p>
                <div className='pl-4'>
                    { burgersData.filter(filterElem => filterElem.type === 'sauce').map((elem, index) => <BurgerIngredientsItem key={index} imgSrc={elem.image} cost={elem.price} caption={elem.name} counterNumber={0} /> )}
                </div>
                <p className="text text_type_main-medium mt-10 mb-6">Начинки</p>
                <div className='pl-4'>
                    { burgersData.filter(filterElem => filterElem.type === 'main').map((elem, index) => <BurgerIngredientsItem key={index} imgSrc={elem.image} cost={elem.price} caption={elem.name} counterNumber={0} /> )}
                </div>
            </div>
        </>
    );
  }
  
  export default BurgerIngredients;