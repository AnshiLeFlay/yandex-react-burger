import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../services/actions/users';
import { Link } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './pages.module.css';

export function ResetPage() {
    const failed = useSelector( store => store.users.resetFailed );
    const request = useSelector( store => store.users.resetRequest);
    const dispatch = useDispatch();

    const [ code, setCode ] = React.useState('');

    const [ password, setPassword ] = React.useState('');
    const onChangePassword = e => {
        setPassword(e.target.value)
    }

    const handleBtn = () => {
        dispatch( reset( password, code ) );
    }

    React.useEffect( () => {
        console.log(failed);
    }, [failed, request]);

    return (
        <div className={ styles.wrapper }>
            <p className='mb-6 text text_type_main-medium'>Восстановление пароля</p>
            <PasswordInput
                onChange={ onChangePassword }
                value={ password }
                placeholder={ 'Введите новый пароль' }
                name={ 'password' }
                extraClass='mb-6'
            />
            <Input
                type={'text'}
                placeholder={'Введите код из письма'}
                onChange={ e => setCode( e.target.value ) }
                value={ code }
                name={'code'}
                size={'default'}
                extraClass="mb-6"
            />
            
            <Button onClick={ handleBtn } htmlType="button" type="primary" size="medium" extraClass='mb-20'>
                Сохранить
            </Button>
            <p className='text text_type_main-small'><span className='text_color_inactive'>Вспомнили пароль?</span> <Link className={styles.link} to='/login'>Войти</Link></p>
        </div>
    );
} 