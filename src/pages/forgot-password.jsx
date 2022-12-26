import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgot } from '../services/actions/users';
import { Link } from 'react-router-dom';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './pages.module.css';

export function ForgotPage() {
    const failed = useSelector( store => store.users.forgotFailed );
    const request = useSelector( store => store.users.forgotRequest);
    const dispatch = useDispatch();

    const [ email, setEmail ] = React.useState('')
    const onChangeEmail = e => {
        setEmail(e.target.value)
    }

    const handleBtn = () => {
        dispatch( forgot( email ) );
    }

    React.useEffect( () => {
        console.log(failed);
    }, [failed, request]);

    return (
        <div className={ styles.wrapper }>
            <p className='mb-6 text text_type_main-medium'>Восстановление пароля</p>
  
            <EmailInput
                onChange={ onChangeEmail }
                value={ email }
                placeholder={ 'Укажите e-mail' }
                name={ 'email' }
                isIcon={ false }
                extraClass='mb-6'
            />

            <Button onClick={ handleBtn } htmlType="button" type="primary" size="medium" extraClass='mb-20'>
                Восстановить
            </Button>
            <p className='text text_type_main-small'><span className='text_color_inactive'>Вспомнили пароль?</span> <Link className={styles.link} to='/login'>Войти</Link></p>
        </div>
    );
} 