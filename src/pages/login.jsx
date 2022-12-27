import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../services/actions/users';
import { Link, useHistory } from 'react-router-dom';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './pages.module.css';

export function LoginPage() {
    const history = useHistory();

    const dispatch = useDispatch();
    const failed = useSelector( store => store.users.loginFailed );
    //const request = useSelector( store => store.users.loginRequest);
    const accessToken = useSelector( store => store.users.user.accessToken);
    
    const [ email, setEmail ] = React.useState('');
    const onChangeEmail = e => {
        setEmail( e.target.value )
    }

    const [ password, setPassword ] = React.useState('')
    const onChangePassword = e => {
        setPassword( e.target.value )
    }

    const handleBtn = () => {
        dispatch( login( email, password) );
    }

    useEffect( () => {
        if ( !failed && accessToken !== '' ) 
            history.push("/");
        //else show error
    }, [ accessToken, failed, history ] );

    return (
        <div className={ styles.wrapper }>
            <p className='mb-6 text text_type_main-medium'>Вход</p>
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
                Войти
            </Button>
            <p className='mb-4 text text_type_main-small'><span className='text_color_inactive'>Вы - новый пользователь?</span> <Link className={styles.link} to='/register'>Зарегистрироваться</Link></p>
            <p className='text text_type_main-small'><span className='text_color_inactive'>Забыли пароль?</span> <Link className={styles.link} to='/forgot-password'>Восстановить пароль</Link></p>
        </div>
    );
} 