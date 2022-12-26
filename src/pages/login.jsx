import React from 'react';
import { Link } from 'react-router-dom';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './pages.module.css';

export function LoginPage() {
    const [ email, setEmail ] = React.useState('')
    const onChangeEmail = e => {
        setEmail(e.target.value)
    }

    const [ password, setPassword ] = React.useState('')
    const onChangePassword = e => {
        setPassword(e.target.value)
    }

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
            <Button htmlType="button" type="primary" size="medium" extraClass='mb-20'>
                Войти
            </Button>
            <p className='mb-4 text text_type_main-small'><span className='text_color_inactive'>Вы - новый пользователь?</span> <Link className={styles.link} to='/register'>Зарегистрироваться</Link></p>
            <p className='text text_type_main-small'><span className='text_color_inactive'>Забыли пароль?</span> <Link className={styles.link} to='/forgot-password'>Восстановить пароль</Link></p>
        </div>
    );
} 