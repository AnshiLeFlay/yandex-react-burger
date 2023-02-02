import React, { useEffect } from 'react';
import { useSelector, useDispatch } from '../services/hooks';
import { useHistory } from 'react-router-dom';

import styles from './pages.module.css'; 
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

export function OrderPage() {
    const dateFromServer = '2022-10-10T17:33:32.877Z';

    const history = useHistory();
    const dispatch = useDispatch();

    return (
        <div className={ `${ styles.wrapper_middle } ${ styles.wrapper_half }` }>
            <p className={ `text text_type_digits-default mb-10 ${ styles.text_center }` }>#919191</p>
            <p className='mb-3 text text_type_main-medium'>#name</p>
            <p className={ `mb-15 text text_type_main-small ${ styles.text_color_light }` }>status</p>
            <p className='mb-6 text text_type_main-medium'>Состав:</p>
            <div className='mb-10 pr-6'>
                <div className={ `${ styles.text_icon_align }` }>
                    <div>
                        <div className={ styles.ingredient_icon } />
                    </div>
                    
                    <div className={ `${ styles.spaced } ${ styles.full_width }` }>
                        <p className='ml-4 mr-4 text text_type_main-default'>name</p>
                        <p className={ `text text_type_digits-default ${ styles.text_icon_align }` }><span className='mr-2'>1 x 640</span><CurrencyIcon type="primary" /></p>
                    </div>
                </div>
            </div>
            <div className={ `${ styles.spaced } ${ styles.text_icon_align }` }>
                <p className={ `text text_type_main-default text_color_inactive` }>
                    <FormattedDate date={ new Date( dateFromServer ) } />
                </p>
                <p className={ `text text_type_digits-default ${ styles.text_icon_align }` }><span className='mr-2'>123</span><CurrencyIcon type="primary" /></p>
            </div>
        </div>
    )
}