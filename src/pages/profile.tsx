import React, { SyntheticEvent, useEffect } from 'react';
import { Link, useHistory, NavLink } from 'react-router-dom';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../services/hooks';
import { logout, updateData, fullUpdate } from '../services/actions/users';
import { ProfileOrdersPage } from './profile-orders';
import { getCookie } from '../utils/cookie';
import styles from './pages.module.css';
import { WS_CONNECTION_END, WS_CONNECTION_START } from '../services/constants/ws';

export function ProfilePage() {
    const dispatch = useDispatch();
    const init_username = useSelector( store => store.users.user.name );
    const init_email = useSelector( store => store.users.user.email );
    const accessToken = useSelector( store => store.users.user.accessToken );

    const [ username, setUsername ] = React.useState( init_username );
    const [ email, setEmail ] = React.useState( init_email );
    const [ password, setPassword ] = React.useState('');
    const [ btnLock, setBtnLock ] = React.useState( true );

    const history = useHistory();

    const onChangeEmail = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        setEmail( e.target.value )
    }
    
    const onChangePassword = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        setPassword( e.target.value );
    }

    const handleLogout = ( e: SyntheticEvent ) => {
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
                'name': username,
                'email': email
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
    }, [ username, email, init_username, init_email ] );

    useEffect( () => {
        setUsername( init_username );
        setEmail( init_email );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ init_username, init_email ] )

    useEffect( () => {
       if ( accessToken === '' || accessToken !== undefined ) fullUpdate( getCookie( 'refreshToken' ) );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] );

    React.useEffect( () => {
        dispatch({ type: WS_CONNECTION_START, url: 'profile' });

        return () => {
            dispatch({ type: WS_CONNECTION_END });
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={ `mt-30 ${styles.wrapper_profile}` }>
            <div className={ styles.profile_cells_wrapper }>
                <p className={ `text text_type_main-medium ${styles.profile_cells}` }> 
                    <NavLink 
                        exact
                        className={ `${styles.profile_link} ${styles.profile_link_inactive}` } 
                        activeClassName={ styles.profile_link_active }
                        to='/profile'>
                        Профиль
                    </NavLink>
                </p>
                <p className={ `text text_type_main-medium ${styles.profile_cells}` }> 
                    <NavLink 
                        exact
                        className={ `${styles.profile_link} ${styles.profile_link_inactive}` } 
                        activeClassName={ styles.profile_link_active }
                        to='/profile/orders'>
                        История заказов
                    </NavLink>
                </p>
                <p className={ `mb-20 text text_type_main-medium ${styles.profile_cells}` }> <Link onClick={ handleLogout } className={ `${styles.profile_link} ${styles.profile_link_inactive}` } to='/' >Выход</Link></p>
                <p className="text text_type_main-small text_color_inactive">В этом разделе вы можете<br />изменить свои персональные данные</p>
            </div>
            <div className='ml-15'>
            { history.location.pathname === '/profile/orders' ? <ProfileOrdersPage /> : 
            
                <form>
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
                </form>
            
            }
            </div>
        </div>
    );
} 