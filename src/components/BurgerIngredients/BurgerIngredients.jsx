import React, { useEffect } from 'react';
//import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import IngredientDetails from './IngredientDetails';
import BurgerIngredientsItem from './BurgerIngredientsItem';
import Modal from '../Modal/Modal';
import { getItems, getOrderNumber } from '../../services/actions';
import styles from './burgeringredients.module.css'; 

function BurgerIngredients() {
    const [ current, setCurrent ] = React.useState( 'one' );
    const [ currentItem, setCurrentItem ] = React.useState( [] );
    const [ visible, setVisibility ] = React.useState( false );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const testDATA = { 
        "ingredients": ["60d3b41abdacab0026a733c7","60d3b41abdacab0026a733cf"]
    };

    const dispatch = useDispatch();
    const data = useSelector( store => store.data.ingredients );
    const orderCheck = useSelector( store => store.order.data );

    useEffect( () => {
        dispatch( getItems() ); 
    }, [ dispatch ] );

    
    useEffect( () => {
        dispatch( getOrderNumber( testDATA ) );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ dispatch ] )


    
    useEffect( () => {
        console.log( "order number - " + orderCheck.order.number );
    }, [ orderCheck ] );
    

    function handleOpenModal( e, elemData ) {
        setCurrentItem( elemData );
        setVisibility( true );
    }

	const handleCloseModal = ( e ) => {
		e.preventDefault();
        setVisibility( false );
	}

    return (
        <>
            <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
            <div className={ styles.tabs_wrapper }>
                <div className={ styles.tabs_wrapper_content }>
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
            <div className={styles.show_scroll + ' custom-scroll mt-10'}>
                <p className="text text_type_main-medium mb-6">Булки</p>
                <div className='pl-4'>
                    { data.filter(filterElem => filterElem.type === 'bun').map((elem) => (
                        <BurgerIngredientsItem handleClick={e => handleOpenModal(e, elem)} key={elem._id} imgSrc={elem.image} cost={elem.price} caption={elem.name} alt={elem.name} counterNumber={0} />
                    ) )}
                </div>
                <p className="text text_type_main-medium mt-10 mb-6">Соусы</p>
                <div className='pl-4'>
                    { data.filter(filterElem => filterElem.type === 'sauce').map((elem) => <BurgerIngredientsItem handleClick={e => handleOpenModal(e, elem)} key={elem._id} imgSrc={elem.image} cost={elem.price} caption={elem.name} alt={elem.name} counterNumber={0} /> )}
                </div>
                <p className="text text_type_main-medium mt-10 mb-6">Начинки</p>
                <div className='pl-4'>
                    { data.filter(filterElem => filterElem.type === 'main').map((elem) => <BurgerIngredientsItem handleClick={e => handleOpenModal(e, elem)} key={elem._id} imgSrc={elem.image} cost={elem.price} caption={elem.name} alt={elem.name} counterNumber={0} /> )}
                </div>
            </div>

            {visible && 
                <Modal header={'Детали ингридиента'} onClose={ handleCloseModal }>
                    <IngredientDetails currentItem={currentItem} />
                </Modal>
            }
        </>
    );
}

/*
BurgerIngredients.propTypes = {
    data: PropTypes.array.isRequired,
};
*/
  
export default BurgerIngredients;