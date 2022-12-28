import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { logout, userData, updateData, token } from '../services/actions/users';
import { getCookie } from '../utils/cookie';
import styles from './pages.module.css';

export function ProfilePage() {
    const dispatch = useDispatch();
    const init_username = useSelector( store => store.users.user.name );
    const init_email = useSelector( store => store.users.user.email );
    const accessToken = useSelector( store => store.users.user.accessToken );
    const dataFailed = useSelector( store => store.users.userFailed );

    const [ username, setUsername ] = React.useState( init_username );
    const [ email, setEmail ] = React.useState( init_email );
    const [ password, setPassword ] = React.useState('');
    const [ btnLock, setBtnLock ] = React.useState( true );

    const onChangeEmail = e => {
        setEmail(e.target.value)
    }
    
    const onChangePassword = e => {
        setPassword(e.target.value);
    }

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch( logout( getCookie( 'refreshToken' ) ) );

    }

    const handleBtn = () => {
        let data;
        if ( password !== '' ) {
            data = {
                name: username,
                email: email,
                password: password
            };
        } else {
            data = {
                'user': {
                    'name': username,
                    'email': email
                }
            };
        }
        dispatch( updateData( accessToken, data ) );
        setBtnLock( true );
    }

    const handleReset = () => {
        setBtnLock( true );
        setUsername( init_username );
        setEmail( init_email );
        setPassword( '' );
    }

    useEffect( () => {
        if ( username !== init_username || email !== init_email ) setBtnLock( false );
    }, [ username, email, init_username, init_email ] )

    useEffect( () => {
        //при монтировании компонента обновить данные с сервера
        dispatch( userData( accessToken ) );
        if ( dataFailed ) {
            /* если ошибка - обновить токен и попробовать еще раз */
            dispatch( token( getCookie( 'refreshToken' ) ) );
            dispatch( userData( accessToken ) );
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] );

    return (
        <div className={ `mt-30 ${styles.wrapper_profile}` }>
            <div className={ styles.profile_cells_wrapper }>
                <p className={ `text text_type_main-medium ${styles.profile_cells}` }> <Link className={ `${styles.profile_link} ${styles.profile_link_active}` } to='/profile'>Профиль</Link></p>
                <p className={ `text text_type_main-medium ${styles.profile_cells}` }> <Link className={ `${styles.profile_link} ${styles.profile_link_inactive}` } to='/profile/orders'>История заказов</Link></p>
                <p className={ `mb-20 text text_type_main-medium ${styles.profile_cells}` }> <Link onClick={ handleLogout } className={ `${styles.profile_link} ${styles.profile_link_inactive}` } to='/' >Выход</Link></p>
                <p className="text text_type_main-small text_color_inactive">В этом разделе вы можете<br />изменить свои персональные данные</p>
            </div>
            <div className='ml-15'>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={ e => setUsername( e.target.value ) }
                    value={ username }
                    name={'name'}
                    error={false}
                    size={'default'}
                    icon={ 'EditIcon' }
                    extraClass="mb-6"
                />
                <EmailInput
                    onChange={ onChangeEmail }
                    placeholder={ 'Логин' }
                    value={ email }
                    name={ 'email' }
                    isIcon={ true }
                    extraClass='mb-6'
                />
                <PasswordInput
                    onChange={ onChangePassword }
                    placeholder={ 'Пароль' }
                    value={ password }
                    name={ 'password' }
                    extraClass='mb-6'
                />
                { 
                    !btnLock && 
                        <div className={ styles.btn_wrapper }>
                            <Button onClick={ handleReset } htmlType="button" type="secondary" size="medium">
                                Отмена
                            </Button>
                            <Button onClick={ handleBtn } htmlType="button" type="primary" size="medium">
                                Сохранить
                            </Button>
                        </div>
                }
            </div>
        </div>
    );
} 