import React, { SyntheticEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import IngredientDetails from './IngredientDetails';
import BurgerIngredientsItem from './BurgerIngredientsItem';
import Modal from '../Modal/Modal';
import { getItems, ADD_DATA_INGREDIENTS_MODAL, DELETE_DATA_INGREDIENTS_MODAL } from '../../services/actions';
import DraggableItem from '../DragAndDrop/DraggableItem';
import styles from './burgeringredients.module.css'; 

interface IBurgerElem {
    _id: string; 
    image: string; 
    price: number; 
    name: string;
}

function BurgerIngredients() {
    const [ current, setCurrent ] = React.useState<String>( 'one' );
    const [ visible, setVisibility ] = React.useState<Boolean>( false );
    const [ orderCounts, setOrderCounts ] = React.useState<{ [ x: string ]: number }>( {} );
    const burgerBun: any = useSelector<any>( store => store.ingredients.burgerIngredients.bun );
    const burgerContent: any = useSelector<any>( store => store.ingredients.burgerIngredients.consist );

    const dispatch: any = useDispatch();
    const data: any = useSelector<any>( store => store.data.ingredients );

    const { ref: bunsRef, inView: bunsView } = useInView();
    const { ref: sauceRef, inView: sauceView } = useInView();
    const { ref: mainRef, inView: mainView } = useInView();

    const countUnique = ( arr: Array<number> | Array<string> ) => {
        let counts: { [ x: string ] : number } = {};
        for ( let i = 0; i < arr.length; i++ ) {
           counts[ arr[i] ] = 1 + ( counts[ arr[i] ] || 0 );
        };
        return counts;
    };

    useEffect( () => {
        if ( bunsView ) { setCurrent('one'); return; }
        if ( sauceView ) { setCurrent('two'); return; }
        if ( mainView ) { setCurrent('three'); return; }

    }, [bunsView, sauceView, mainView]);

    useEffect( () => {
        const orderArr: Array<string> = [ burgerBun, ...burgerContent ];
        setOrderCounts( countUnique( orderArr ) );
    }, [burgerBun, burgerContent]);

    useEffect( () => {
        dispatch( getItems() );
    }, [ dispatch ] );
  
    function handleOpenModal( e: React.MouseEvent, elemData: IBurgerElem ) {
        //добавляем в хранилище данные по ингредиенту и отображаем модальное окно
        dispatch({ type: ADD_DATA_INGREDIENTS_MODAL, item: elemData });
        setVisibility( true );
    }

	const handleCloseModal = ( e: SyntheticEvent ) => {
		e.preventDefault();
        //перед закрытием очищаем данные
        dispatch({ type: DELETE_DATA_INGREDIENTS_MODAL });
        setVisibility( false );
	}

    return (
        <>
            <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
            <div className={ styles.tabs_wrapper }>
                <div id='parent-tab' className={ styles.tabs_wrapper_content }>
                    <Tab value="one" active={current === 'one'} onClick={ setCurrent }>
                    Булки
                    </Tab>
                    <Tab value="two" active={current === 'two'} onClick={ setCurrent }>
                    Соусы
                    </Tab>
                    <Tab value="three" active={current === 'three'} onClick={ setCurrent }>
                    Начинки
                    </Tab>
                </div>
            </div>
            <div className={styles.show_scroll + ' custom-scroll mt-10'}>
                <div id="buns-section" ref={bunsRef}>
                    <p className="text text_type_main-medium mb-6">Булки</p>
                    <div className='pl-4'>
                        { data.filter( ( filterElem: { type: string; } ) => filterElem.type === 'bun' ).map(
                            ( elem: IBurgerElem ) => 
                            <DraggableItem key={'bun_' + elem._id} data={{ id: elem._id, content: 'bun', board: 'ingredients'}}>
                                <BurgerIngredientsItem handleClick={ e => handleOpenModal( e, elem ) } key={elem._id} imgSrc={elem.image} cost={elem.price} caption={elem.name} alt={elem.name} counterNumber={ orderCounts[ elem._id ] } />
                            </DraggableItem>
                        )}
                    </div>
                </div>
                <div ref={sauceRef} id="sauce-section">
                    <p className="text text_type_main-medium mt-10 mb-6">Соусы</p>
                    <div className='pl-4'>
                        { data.filter( ( filterElem: { type: string; } ) => filterElem.type === 'sauce').map(
                            ( elem: IBurgerElem ) => 
                            <DraggableItem key={'sauce_' + elem._id} data={{ id: elem._id, content: 'sauce', board: 'ingredients'}}>
                                <BurgerIngredientsItem handleClick={e => handleOpenModal(e, elem)} key={elem._id} imgSrc={elem.image} cost={elem.price} caption={elem.name} alt={elem.name} counterNumber={ orderCounts[ elem._id ] } /> 
                            </DraggableItem>
                        )}
                    </div>
                </div>
                <div ref={mainRef} id="main-section">
                    <p className="text text_type_main-medium mt-10 mb-6">Начинки</p>
                    <div className='pl-4'>
                        { data.filter( ( filterElem: { type: string; } ) => filterElem.type === 'main').map(
                            ( elem: IBurgerElem ) => 
                            <DraggableItem key={'main_' + elem._id} data={{ id: elem._id, content: 'main', board: 'ingredients'}}>
                                <BurgerIngredientsItem handleClick={e => handleOpenModal(e, elem)} key={elem._id} imgSrc={elem.image} cost={elem.price} caption={elem.name} alt={elem.name} counterNumber={ orderCounts[ elem._id ] } /> 
                            </DraggableItem>
                        )}
                    </div>
                </div>
            </div>

            {visible && 
                <Modal header={'Детали ингридиента'} onClose={ handleCloseModal }>
                    <IngredientDetails />
                </Modal>
            }
        </>
    );
}
  
export default BurgerIngredients;