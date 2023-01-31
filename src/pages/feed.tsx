import React from 'react';

import FeedCard from '../components/Cards/FeedCard';

import styles from './pages.module.css';

export function FeedPage() {


    return (
        <div>
            <p className={ `text text_type_main-large mt-10 mb-5 ${ styles.page_header }`}>Лента заказов</p>
            <div className={ styles.main_content }>
                <div className={ `${ styles.main_content_item } ${ styles.left_column_item }` }>
                    
                    <FeedCard 
                        orderNumber={ 123213 }
                        orderDate={ 'Today, HH:MM' }
                        burgerName={ 'Burger with no name' }
                        price={ 480 }
                        ingredients={ [
                            { image: 'https://code.s3.yandex.net/react/code/meat-04.png' },
                            { image: 'https://code.s3.yandex.net/react/code/meat-04.png' },
                            { image: 'https://code.s3.yandex.net/react/code/meat-04.png' },
                            { image: 'https://code.s3.yandex.net/react/code/meat-04.png' },
                            { image: 'https://code.s3.yandex.net/react/code/meat-04.png' },
                            { image: 'https://code.s3.yandex.net/react/code/meat-04.png' },
                            { image: 'https://code.s3.yandex.net/react/code/meat-04.png' },
                            { image: 'https://code.s3.yandex.net/react/code/meat-04.png' },
                            { image: 'https://code.s3.yandex.net/react/code/meat-04.png' },
                            { image: 'https://code.s3.yandex.net/react/code/meat-04.png' },
                            { image: 'https://code.s3.yandex.net/react/code/meat-04.png' },
                        ] }
                    />

                </div>
                <div className={ styles.main_content_item }>
                    <div className={ `mb-15 ${ styles.wrapper_order_feed }` }>
                        <div className={ styles.wrapper_half }>
                            <p className='text text_type_main-medium mb-6'>Готовы:</p>
                            <p className={ `text text_type_digits-default ${ styles.text_color_order_number } ${ styles.wrapper_column }`}>
                                <span>034501</span>
                                <span>034501</span>
                                <span>034501</span>
                                <span>034501</span>
                                <span>034501</span>
                                <span>034501</span>
                            </p>
                        </div>
                        <div className={ styles.wrapper_half }>
                            <p className='text text_type_main-medium mb-6'>В работе:</p>
                            <p className={ `text text_type_digits-default ${ styles.wrapper_column }` }>
                                <span>034501</span>
                                <span>034501</span>
                                <span>034501</span>
                            </p>
                        </div>
                    </div>
                    <p className='text text_type_main-medium'>Выполнено за все время:</p>
                    <p className='text text_type_digits-large mb-15'>28752</p>
                    <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
                    <p className='text text_type_digits-large'>138</p>
                </div>
            </div>
        </div>
    );
} 