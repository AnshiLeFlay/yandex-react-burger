import React, { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from '../services/hooks';
import { register } from '../services/actions/users';
import { Link, useHistory } from 'react-router-dom';
import { Input, PasswordInput, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './pages.module.css';

export function RegisterPage() {
    const history = useHistory();

    const [ username, setUsername ] = React.useState('');

    const [ email, setEmail ] = React.useState('')
    const onChangeEmail = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        setEmail(e.target.value)
    }

    const [ password, setPassword ] = React.useState('');
    const onChangePassword = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        setPassword( e.target.value );
    }

    const failed = useSelector( store => store.users.registerFailed );
    const token = useSelector( store => store.users.user.refreshToken );

    const dispatch = useDispatch();

    const handleBtn = ( e: SyntheticEvent ) => {
        e.preventDefault();
        dispatch( register( username, email, password ));
    }

    
    React.useEffect( () => {
        //проверяем, что нет ошибок и токен записался в store
        //если все ок, то перенаправляем на страницу '/'
        if ( token !== '' && failed !== true ) {
            history.push('/')
        }
    }, [ token, failed, history ]);
    

    return (
        <div className={ styles.wrapper }>
            <p className='mb-6 text text_type_main-medium'>Регистрация</p>
            <form className={ styles.form_wrapper }>
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
            </form>
            <p className='text text_type_main-small'><span className='text_color_inactive'>Уже зарегистрированы?</span> <Link className={styles.link} to='/login'>Войти</Link></p>
        </div>
    );
} 