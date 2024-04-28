import React, { useContext, useEffect, useState } from 'react';
import useMainService from '../services/MainService';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { PopupContext } from '../providers/PopupProvider';
import { setLocalStorageWithExpiry } from '../services/setLocalStorageWithExpiry';

const UserEdit = () => {
    const [fullName, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const [hideConfirm, setHideConfirm] = useState(true);
    const { getUserInfoById, getUserInfo, setUserData } = useMainService();
    const navigate = useNavigate();
    const { id } = useParams();
    const { setData } = useContext(PopupContext);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const me = searchParams.get('me');

    useEffect(() => {
        if (me) {

        } else {
            setPassword("password");
            setConfirmPassword("password")
        }

        getUserInfoById(id)
            .then(data => {
                setFullname(data.fullName);
                setUsername(data.username);
                setEmail(data.email ? data.email : '');
            })
            .catch(err => {
                console.log(err);
                console.log("user not found!");
                navigate("/profile");
            })
    }, [])

    function validateEmail(email) {
        return email.includes("@") && email.includes(".");
    }

    const edit = () => {
        const user = {
            fullName: fullName,
            username: username,
            me: me ? true : false,
            email, password, confirmPassword: me ? confirmPassword : password
        }

        console.log(user);

        if (fullName === '' || email === '' || !validateEmail(email) || password !== confirmPassword || password === '') {
            setData({ show: true, text: 'Введите корректные данные!', title: 'Ошибка ввода!' });
            return;
        }


        setUserData(user)
            .then(data => {
                navigate("/profile");
            })
            .catch(err => {
                console.log(err);
                setData({ show: true, text: 'Не корректные данные!', title: 'Ошибка данных!' });

            });
    }


    return (
        <div className='login'>
            <div className="login__row">
                <div className="login__title">Изменения</div>
                <div className="login__input">
                    <input autoComplete='off'
                        className={fullName !== '' ? 'focus' : ''}
                        type="text"
                        id='username'
                        value={fullName}
                        onChange={e => setFullname(e.target.value)} />
                    <label htmlFor="username">
                        Имя пользователя
                    </label>
                </div>
                <div className="login__input">
                    <input autoComplete='off'
                        className={email !== '' ? 'focus' : ''}
                        type="text"
                        id='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    <label htmlFor="email">
                        Email
                    </label>
                </div>
                {me ? <><div className="login__input">
                    <input autoComplete='off'
                        className={'icon' + (password !== '' ? ' focus' : '')}
                        type={hidePassword ? "password" : 'text'}
                        id='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                    <label htmlFor="password">
                        Пароль
                    </label>
                    <div
                        className={"login__icon" + (hidePassword ? '' : ' view')}
                        onClick={() => { setHidePassword(hidePassword => !hidePassword) }}>
                        <i className="fa-regular fa-eye login__icon-view"></i>
                        <i className="fa-regular fa-eye-slash login__icon-hidden"></i>
                    </div>
                </div>
                    <div className="login__input">
                        <input autoComplete='off'
                            className={'icon' + (confirmPassword !== '' ? ' focus' : '')}
                            type={hideConfirm ? "password" : 'text'}
                            id='confirmPassword'
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)} />
                        <label htmlFor="confirmPassword">
                            Подтверждение
                        </label>
                        <div
                            className={"login__icon" + (hideConfirm ? '' : ' view')}
                            onClick={() => { setHideConfirm(hideConfirm => !hideConfirm) }}>
                            <i className="fa-regular fa-eye login__icon-view"></i>
                            <i className="fa-regular fa-eye-slash login__icon-hidden"></i>
                        </div>
                    </div></> : null}
                <div className="login__space">
                    <div className="login__button" onClick={edit}>Сохранить</div>
                    <div className="login__button dec" onClick={() => navigate("/profile")}>Отмена</div>
                </div>
            </div>
        </div>
    );
};

export default UserEdit;