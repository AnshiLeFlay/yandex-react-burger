import React, { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from '../services/hooks';
import { reset } from '../services/actions/users';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './pages.module.css';

export function ResetPage() {
    const history: any = useHistory();
    
    const failed = useSelector( store => store.users.resetFailed );
    const dispatch = useDispatch();

    const [ code, setCode ] = React.useState( '' );

    const [ password, setPassword ] = React.useState( '' );
    const onChangePassword = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        setPassword( e.target.value );
    }

    const handleBtn = ( e: SyntheticEvent ) => {
        e.preventDefault();
        dispatch( reset( password, code ) );

        //если нет ошибок отправляем на страницу авторизации
        if ( failed !== true ) {
            history.push( '/login' );
        } else {
            console.log( 'error reset password' );
        }
    }

    if ( history.location?.state?.from !== '/forgot-password' ) {
        return (
            <Redirect
                to={ '/' }
            />
        );
    }

    return (
        <div className={ styles.wrapper }>
            <p className='mb-6 text text_type_main-medium'>Восстановление пароля</p>
            <form className={ styles.form_wrapper }>
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
            </form>
            <p className='text text_type_main-small'><span className='text_color_inactive'>Вспомнили пароль?</span> <Link className={styles.link} to='/login'>Войти</Link></p>
        </div>
    );
} 