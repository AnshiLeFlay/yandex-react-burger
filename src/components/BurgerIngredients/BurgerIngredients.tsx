import React, { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { useInView } from 'react-intersection-observer';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerIngredientsItem from './BurgerIngredientsItem';
import { getItems } from '../../services/actions';
import { DELETE_DATA_INGREDIENTS_MODAL } from '../../services/constants/ingredients';
import DraggableItem from '../DragAndDrop/DraggableItem';
import styles from './burgeringredients.module.css'; 
import { TIngredient } from '../../services/types';
import { Link, useLocation } from 'react-router-dom';

function BurgerIngredients() {
    const location = useLocation();

    const [ current, setCurrent ] = React.useState<String>( 'one' );
    const [ orderCounts, setOrderCounts ] = React.useState<{ [ x: string ]: number }>( {} );
    const burgerBun = useSelector( store => store.ingredients.burgerIngredients.bun );
    const burgerContent = useSelector( store => store.ingredients.burgerIngredients.consist );

    const dispatch = useDispatch();
    const data = useSelector( store => store.data.ingredients );

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
                        { data.filter( ( filterElem ) => filterElem.type === 'bun' ).map(
                            ( elem: TIngredient ) => 
                            <DraggableItem key={'bun_' + elem._id} data={{ id: elem._id!, content: 'bun', board: 'ingredients'}}>
                                <Link 
                                    className={ styles.link_reset }
                                    onClick={ () => { dispatch( { type: DELETE_DATA_INGREDIENTS_MODAL } ) }}
                                    to={{
                                        pathname: `/ingredients/${ elem._id }`,
                                        state: { background: location }
                                    }}
                                    key={ `link-${ elem._id }` }>
                                    <BurgerIngredientsItem key={elem._id} imgSrc={ elem.image! } cost={ elem.price! } caption={ elem.name! } alt={ elem.name! } counterNumber={ orderCounts[ elem._id! ] } />
                                </Link>
                            </DraggableItem>
                        ) }
                    </div>
                </div>
                <div ref={sauceRef} id="sauce-section">
                    <p className="text text_type_main-medium mt-10 mb-6">Соусы</p>
                    <div className='pl-4'>
                        { data.filter( ( filterElem ) => filterElem.type === 'sauce').map(
                            ( elem: TIngredient ) => 
                            <DraggableItem key={'sauce_' + elem._id} data={{ id: elem._id!, content: 'sauce', board: 'ingredients'}}>
                                <Link 
                                    className={ styles.link_reset }
                                    onClick={ () => { dispatch( { type: DELETE_DATA_INGREDIENTS_MODAL } ) }}
                                    to={{
                                        pathname: `/ingredients/${ elem._id }`,
                                        state: { background: location }
                                    }}
                                    key={ `link-${ elem._id }` }>
                                    <BurgerIngredientsItem key={elem._id} imgSrc={ elem.image! } cost={ elem.price! } caption={ elem.name! } alt={ elem.name! } counterNumber={ orderCounts[ elem._id! ] } /> 
                                </Link>
                            </DraggableItem>
                        )}
                    </div>
                </div>
                <div ref={mainRef} id="main-section">
                    <p className="text text_type_main-medium mt-10 mb-6">Начинки</p>
                    <div className='pl-4'>
                        { data.filter( ( filterElem ) => filterElem.type === 'main').map(
                            ( elem: TIngredient ) => 
                            <DraggableItem key={'main_' + elem._id} data={{ id: elem._id!, content: 'main', board: 'ingredients'}}>
                                <Link 
                                    className={ styles.link_reset }
                                    onClick={ () => { dispatch( { type: DELETE_DATA_INGREDIENTS_MODAL } ) }}
                                    to={{
                                        pathname: `/ingredients/${ elem._id }`,
                                        state: { background: location }
                                    }}
                                    key={ `link-${ elem._id }` }>
                                    <BurgerIngredientsItem key={ elem._id } imgSrc={ elem.image! } cost={ elem.price! } caption={ elem.name! } alt={ elem.name! } counterNumber={ orderCounts[ elem._id! ] } /> 
                                </Link>
                            </DraggableItem>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
  
export default BurgerIngredients;