import React, { useContext, useEffect, useMemo, useState } from 'react';
import useMainService from '../services/MainService';
import ReactInputMask from 'react-input-mask';
import { PopupContext } from '../providers/PopupProvider';
import { useNavigate } from 'react-router-dom';

const UserCreate = () => {
    const [role, setRole] = useState('ROLE_USER');

    const [number, setNumber] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const { register } = useMainService();
    const { data, setData } = useContext(PopupContext);
    const navigate = useNavigate();

    function generatePassword() {
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*-';
        var password = '';

        for (var i = 0; i < 12; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return password;
    }

    const createUser = () => {
        register({ username: number, fullName: fullname, email, password: generatePassword(), role })
            .then(data => {
                navigate("/profile");
            })
            .catch(err => {
                console.log(err);
                setData({ show: true, text: 'Этот пользователь уже существует!', title: 'Ошибка' });
            });
    }

    return (
        <div className='login'>
            <div className="login__row">
                <div className="login__title">Создать пользователя</div>
                <div className="login__input">
                    <ReactInputMask
                        mask={"+7(999)999-99-99"}
                        autoComplete='off'
                        className={number !== '' ? 'focus' : ''}
                        type="text"
                        id='title'
                        value={number}
                        onChange={e => setNumber(e.target.value)} />
                    <label htmlFor="title">
                        Номер телефона
                    </label>
                </div>
                <div className="login__input">
                    <input
                        autoComplete='off'
                        className={(fullname !== '' ? ' focus' : '')}
                        type="text"
                        id='text'
                        value={fullname}
                        onChange={e => setFullname(e.target.value)} />
                    <label htmlFor="text">
                        ФИО
                    </label>
                </div>
                <div className="login__input">
                    <input
                        autoComplete='off'
                        className={(email !== '' ? ' focus' : '')}
                        type="text"
                        id='text'
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    <label htmlFor="text">
                        Email
                    </label>
                </div>
                <div className="login__input">
                    <select onChange={e => setRole(e.target.value)} value={role}>
                        <option value="ROLE_USER">Пользователь</option>
                        <option value="ROLE_KSK">Жкх</option>
                    </select>
                    <label>Роль</label>
                </div>
                <div className="login__button" onClick={createUser}>Сохранить</div>
            </div>
        </div>
    );
};

export default UserCreate;