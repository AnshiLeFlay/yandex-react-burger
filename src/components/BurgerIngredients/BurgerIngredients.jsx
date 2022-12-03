import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerIngredientsItem from './BurgerIngredientsItem';
import styles from './burgeringredients.module.css'; 

import Modal from '../Modal/Modal';

function BurgerIngredients( props ) {
    const [current, setCurrent] = React.useState('one');
 
    const [currentItem, setCurrentItem] = React.useState([]);

    const [ visible, setVisibility ] = React.useState( false );

    function handleOpenModal(e, elemData) {
        setCurrentItem(elemData);
        setVisibility( true );
    }

	const handleCloseModal = (e) => {
		e.preventDefault();
		if (e.target === e.currentTarget) {
			setVisibility( false );
		}
	}

    const escFunction = (e) => {
        if (e.key === "Escape") {
            setVisibility( false );
        }
    }

    React.useEffect( () => {
        document.addEventListener("keydown", escFunction, false);

        return () => {
            document.removeEventListener("keydown", escFunction, false);
        }
    });

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
                    { Array.isArray( props.data ) && props.data.filter(filterElem => filterElem.type === 'bun').map((elem) => (
                        <BurgerIngredientsItem handleClick={e => handleOpenModal(e, elem)} key={elem._id} imgSrc={elem.image} cost={elem.price} caption={elem.name} alt={elem.name} counterNumber={0} />
                    ) )}
                </div>
                <p className="text text_type_main-medium mt-10 mb-6">Соусы</p>
                <div className='pl-4'>
                    { Array.isArray(props.data) && props.data.filter(filterElem => filterElem.type === 'sauce').map((elem) => <BurgerIngredientsItem handleClick={e => handleOpenModal(e, elem)} key={elem._id} imgSrc={elem.image} cost={elem.price} caption={elem.name} alt={elem.name} counterNumber={0} /> )}
                </div>
                <p className="text text_type_main-medium mt-10 mb-6">Начинки</p>
                <div className='pl-4'>
                    { Array.isArray(props.data) && props.data.filter(filterElem => filterElem.type === 'main').map((elem) => <BurgerIngredientsItem handleClick={e => handleOpenModal(e, elem)} key={elem._id} imgSrc={elem.image} cost={elem.price} caption={elem.name} alt={elem.name} counterNumber={0} /> )}
                </div>
            </div>

            {visible && 
                <Modal header={'Детали ингридиента'} onClose={ handleCloseModal }>
                    <div className={styles.ingredients_modal}>
                        <img className='' alt={currentItem.name} src={currentItem.image} />
                        <p className="text text_type_main-small mt-4 mb-8">{currentItem.name}</p>
                        <div className={styles.nutrients + ' mb-15'}>
                            <p className='text text_type_main-small text_color_inactive mr-5'>Калории, ккал<br/><span className='text_type_digits-default'>{currentItem.calories}</span></p>
                            <p className='text text_type_main-small text_color_inactive mr-5'>Белки, г<br/><span className='text_type_digits-default'>{currentItem.proteins}</span></p>
                            <p className='text text_type_main-small text_color_inactive mr-5'>Жиры, г<br/><span className='text_type_digits-default'>{currentItem.fat}</span></p>
                            <p className='text text_type_main-small text_color_inactive'>Углеводы, г<br/><span className='text_type_digits-default'>{currentItem.carbohydrates}</span></p>
                        </div>
                    </div>
                </Modal>
            }
        </>
    );
}

Modal.propTypes = {
    data: PropTypes.array,
};
  
export default BurgerIngredients;