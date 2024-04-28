import React, { useContext, useEffect, useState } from 'react';
import useMainService from '../services/MainService';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { PopupContext } from '../providers/PopupProvider';
import ReactInputMask from 'react-input-mask';

const Jkh = () => {
    const [legalAddress, setLegalAddress] = useState('');
    const [inn, setInn] = useState('');
    const [kpp, setKpp] = useState('');
    const [name, setName] = useState('');
    const [bankAccount, setBankAccount] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const { role } = useContext(AuthContext);
    const { createJkh, addEmployeeJkh } = useMainService();
    const navigate = useNavigate();
    const { data, setData } = useContext(PopupContext);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    useEffect(() => {
        if (role.filter(item => item.name === "ROLE_ADMIN").length === 0) {
            navigate("/");
        }
    }, [])

    const create = () => {
        if (legalAddress == '' ||
            inn == '' ||
            kpp == '' ||
            name == '' ||
            bankAccount == '' ||
            phoneNumber == '') {
            setData({ show: true, text: 'Введите корректные данные!', title: 'Ошибка' });
            return;
        }

        const jkh = { legalAddress, inn, kpp, name, bankAccount, phoneNumber };
        createJkh(jkh)
            .then(data => {
                navigate("/profile")
            })
            .catch(err => {
                console.log(err);
                setData({ show: true, text: 'Не удалось создать ЖКХ!', title: 'Ошибка' });
            })
    }


    return (
        <div className='login'>
            <div className="login__row">
                <div className="login__title">Создать жкх</div>
                <div className="login__input">
                    <input autoComplete='off'
                        className={name !== '' ? 'focus' : ''}
                        type="text"
                        id='name'
                        value={name}
                        onChange={e => setName(e.target.value)} />
                    <label htmlFor="name">
                        Наименование
                    </label>
                </div>
                <div className="login__input">
                    <input autoComplete='off'
                        className={inn !== '' ? 'focus' : ''}
                        type="text"
                        id='inn'
                        value={inn}
                        onChange={e => setInn(e.target.value)} />
                    <label htmlFor="inn">
                        ИНН
                    </label>
                </div>
                <div className="login__input">
                    <input autoComplete='off'
                        className={kpp !== '' ? 'focus' : ''}
                        type="text"
                        id='kpp'
                        value={kpp}
                        onChange={e => setKpp(e.target.value)} />
                    <label htmlFor="kpp">
                        КПП
                    </label>
                </div>
                <div className="login__input">
                    <input autoComplete='off'
                        className={bankAccount !== '' ? 'focus' : ''}
                        type="text"
                        id='bankAccount'
                        value={bankAccount}
                        onChange={e => setBankAccount(e.target.value)} />
                    <label htmlFor="bankAccount">
                        Банковский счет
                    </label>
                </div>
                <div className="login__input">
                    <input autoComplete='off'
                        className={legalAddress !== '' ? 'focus' : ''}
                        type="text"
                        id='legalAddress'
                        value={legalAddress}
                        onChange={e => setLegalAddress(e.target.value)} />
                    <label htmlFor="legalAddress">
                        Юридический адрес
                    </label>
                </div>
                <div className="login__input">
                    <ReactInputMask
                        mask={"+7(999)999-99-99"}
                        autoComplete='off'
                        className={phoneNumber !== '' ? 'focus' : ''}
                        type="text"
                        id='phoneNumber'
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)} />
                    <label htmlFor="phoneNumber">
                        Номер телефона
                    </label>
                </div>
                <div className="login__button" onClick={create}>Сохранить</div>
            </div>
        </div>
    );
};

export default Jkh;