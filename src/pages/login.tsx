import React, { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from '../services/hooks';
import { login } from '../services/actions/users';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getCookie } from '../utils/cookie';
import styles from './pages.module.css';

export function LoginPage() {
    const history: any = useHistory();

    const dispatch = useDispatch();
    const failed = useSelector( store => store.users.loginFailed );
    const accessToken = useSelector( store => store.users.user.accessToken );
    
    const [ email, setEmail ] = React.useState('');
    const onChangeEmail = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        setEmail( e.target.value )
    }

    const [ password, setPassword ] = React.useState('')
    const onChangePassword = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        setPassword( e.target.value )
    }

    const handleBtn = ( e: SyntheticEvent ) => {
        e.preventDefault();
        dispatch( login( email, password) );
    }

    if ( !failed && accessToken !== '' ) {
        return (
            <Redirect
                to={ history.location.state?.from || '/' }
            />
        );
    }

    //если у пользователя есть cookie, то отправляем его на прошлую страницу, либо на главную
    if ( getCookie( 'refreshToken' ) !== undefined ) {
        return (
            <Redirect
                to={ history.location.state?.from || '/' }
            />
        );
    }

    return (
        <div className={ styles.wrapper }>
            <p className='mb-6 text text_type_main-medium'>Вход</p>
            <form className={ styles.form_wrapper }>
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
            </form>
            <p className='mb-4 text text_type_main-small'><span className='text_color_inactive'>Вы - новый пользователь?</span> <Link className={styles.link} to='/register'>Зарегистрироваться</Link></p>
            <p className='text text_type_main-small'><span className='text_color_inactive'>Забыли пароль?</span> <Link className={styles.link} to='/forgot-password'>Восстановить пароль</Link></p>
        </div>
    );
} 