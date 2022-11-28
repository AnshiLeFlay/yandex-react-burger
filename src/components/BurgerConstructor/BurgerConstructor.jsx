import React from 'react';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { burgersData } from '../../utils/data';

function BurgerConstructor() {
    const img = 'https://yandex-practicum.github.io/react-developer-burger-ui-components/docs/static/img-5f9ccf21a0eb45d06e57410b025f366c.png';

    return (
        <>
            <div className='mt-25 pl-4 pr-4' style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div className='pl-8'>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={img}
                    />
                </div>

                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        text={burgersData[3].name}
                        price={burgersData[3].price}
                        thumbnail={burgersData[3].image}
                    />
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        text={burgersData[1].name}
                        price={burgersData[1].price}
                        thumbnail={burgersData[1].image}
                    />
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        text={burgersData[7].name}
                        price={burgersData[7].price}
                        thumbnail={burgersData[7].image}
                    />
                </div>

                <div className='pl-8'>
                    <ConstructorElement
                        className='ml-8'
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={img}
                    />
                </div>
                <div className='mt-10' style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <p className="text text_type_digits-medium mr-10"><span>610</span>&nbsp;<CurrencyIcon type="primary" /></p>
                    <Button>Оформить заказ</Button>
                </div>
            </div>
        </>
    );
  }
  
  export default BurgerConstructor;