import React, { useContext, useMemo, useState } from 'react';
import useMainService from '../services/MainService';
import { useNavigate } from 'react-router-dom';
import { setLocalStorageWithExpiry } from '../services/setLocalStorageWithExpiry';
import { AuthContext } from '../providers/AuthProvider';
import { PopupContext } from '../providers/PopupProvider';
import ReactInputMask from 'react-input-mask';

const Login = () => {
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [hide, setHide] = useState(true);
    const { auth } = useMainService();
    const navigate = useNavigate();
    const [isNumber, setNumber] = useState(false);

    const { isAuth, setAuth } = useContext(AuthContext);
    const { setData } = useContext(PopupContext);

    const authorize = () => {
        auth(isNumber ? phone : username, password)
            .then(data => {
                const expiryDate = new Date();
                expiryDate.setHours(expiryDate.getHours() + 6);
                setLocalStorageWithExpiry('token', data.token, expiryDate.toISOString());
                setAuth(true);
                navigate('/');
            })
            .catch(err => {
                console.log(err);
                setData({ show: true, text: 'Не правильный логин или пароль', title: 'Ошибка' });
            });
    }

    return (
        <div className='login'>
            <div className="login__row">
                <div className="login__title">Авторизация</div>
                {!isNumber ? <div className="login__input">
                    <input autoComplete='off'
                        className={username !== '' ? 'focus' : ''}
                        type="text"
                        id='username'
                        value={username}
                        onChange={e => setUsername(e.target.value)} />
                    <label htmlFor="username">
                        Имя пользователя
                    </label>
                    <div
                        className={"login__icon"}
                        onClick={() => { setNumber(true) }}>
                        <i className="fa-solid fa-font"></i>
                    </div>
                </div> : null}
                {isNumber ? <div className="login__input">
                    <ReactInputMask
                        mask={"+7(999)999-99-99"}
                        autoComplete='off'
                        className={phone !== '' ? 'focus' : ''}
                        type="text"
                        id='phone'
                        value={phone}
                        onChange={e => setPhone(e.target.value)} />
                    <label htmlFor="phone">
                        Номер телефона
                    </label>
                    <div
                        className={"login__icon"}
                        onClick={() => { setNumber(false) }}>
                        <i className="fa-solid fa-phone"></i>
                    </div>
                </div> : null}
                <div className="login__input">
                    <input autoComplete='off'
                        className={'icon' + (password !== '' ? ' focus' : '')}
                        type={hide ? "password" : 'text'}
                        id='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                    <label htmlFor="password">
                        Пароль
                    </label>
                    <div
                        className={"login__icon" + (hide ? '' : ' view')}
                        onClick={() => { setHide(hide => !hide) }}>
                        <i className="fa-regular fa-eye login__icon-view"></i>
                        <i className="fa-regular fa-eye-slash login__icon-hidden"></i>
                    </div>
                </div>
                <div className="login__button" onClick={authorize}>Войти</div>
            </div>
        </div>
    );
};

export default Login;