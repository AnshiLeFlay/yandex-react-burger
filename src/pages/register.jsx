import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../services/actions/users';
import { Link } from 'react-router-dom';
import { Input, PasswordInput, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './pages.module.css';

export function RegisterPage() {
    const [ username, setUsername ] = React.useState('');

    const [ email, setEmail ] = React.useState('')
    const onChangeEmail = e => {
        setEmail(e.target.value)
    }

    const [ password, setPassword ] = React.useState('');
    const onChangePassword = e => {
        setPassword(e.target.value)
    }

    const failed = useSelector( store => store.users.registerFailed );
    const request = useSelector( store => store.users.registerRequest);
    const dispatch = useDispatch();

    const handleBtn = () => {
        dispatch( register( username, email, password ));
    }

    React.useEffect( () => {
        console.log(failed);
    }, [failed, request]);

    return (
        <div className={ styles.wrapper }>
            <p className='mb-6 text text_type_main-medium'>Регистрация</p>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={ e => setUsername( e.target.value ) }
                value={ username }
                name={'name'}
                error={false}
                size={'default'}
                extraClass="mb-6"
            />
            <EmailInput
                onChange={ onChangeEmail }
                value={ email }
                name={ 'email' }
                isIcon={ false }
                extraClass='mb-6'
            />
            <PasswordInput
                onChange={ onChangePassword }
                value={ password }
                name={ 'password' }
                extraClass='mb-6'
            />
            <Button onClick={ handleBtn } htmlType="button" type="primary" size="medium" extraClass='mb-20'>
                Зарегистрироваться
            </Button>
            <p className='text text_type_main-small'><span className='text_color_inactive'>Уже зарегистрированы?</span> <Link className={styles.link} to='/login'>Войти</Link></p>
        </div>
    );
} 