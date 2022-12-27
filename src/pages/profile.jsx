import React from 'react';
//import { Link } from 'react-router-dom';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './pages.module.css';

export function ProfilePage() {
    const [ username, setUsername ] = React.useState('');

    const [ email, setEmail ] = React.useState('')
    const onChangeEmail = e => {
        setEmail(e.target.value)
    }

    const [ password, setPassword ] = React.useState('');
    const onChangePassword = e => {
        setPassword(e.target.value)
    }

    return (
        <div className={ `mt-30 ${styles.wrapper_profile}` }>
            <div className={ styles.profile_cells_wrapper }>
                <p className={ `text text_type_main-medium ${styles.profile_cells}` }>Профиль</p>
                <p className={ `text text_type_main-medium ${styles.profile_cells}` }>История заказов</p>
                <p className={ `mb-20 text text_type_main-medium ${styles.profile_cells}` }>Выход</p>
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
            </div>
        </div>
    );
} 