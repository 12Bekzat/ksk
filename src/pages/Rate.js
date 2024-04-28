import React, { useContext, useEffect, useState } from 'react';
import useMainService from '../services/MainService';
import { PopupContext } from '../providers/PopupProvider';
import { useLocation, useNavigate } from 'react-router-dom';

const Rate = () => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState(0);
    const [price, setPrice] = useState(0);
    const { createRate, getRateById, editRate } = useMainService();
    const { setData } = useContext(PopupContext);
    const navigate = useNavigate();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    useEffect(() => {
        if (id)
            getRateById(id)
                .then(data => {
                    setName(data.name);
                    setNumber(data.number);
                    setPrice(data.price);
                })
                .catch(err => console.log(err));
    }, [id]);

    const create = () => {
        if (name == '' || number == 0 || price == 0) {
            setData({ show: true, text: 'Введите корректные данные!', title: 'Ошибка' });
            return;
        }

        const rate = { name, number, price };

        if (id) {
            editRate(id, rate)
                .then(data => {
                    navigate("/profile");
                })
                .catch(err => console.log(err));
        } else {
            createRate(rate)
                .then(data => {
                    navigate("/profile");
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <div className='login'>
            <div className="login__row">
                <div className="login__title">Создать тариф</div>
                <div className="login__input">
                    <input autoComplete='off'
                        className={name !== '' ? 'focus' : ''}
                        type="text"
                        id='name'
                        value={name}
                        onChange={e => setName(e.target.value)} />
                    <label htmlFor="name">
                        Имя
                    </label>
                </div>
                <div className="login__input">
                    <input autoComplete='off'
                        className={number !== '' ? 'focus' : ''}
                        type="number"
                        id='number'
                        value={number}
                        onChange={e => setNumber(e.target.value)} />
                    <label htmlFor="number">
                        Уникальный номер
                    </label>
                </div>
                <div className="login__input">
                    <input autoComplete='off'
                        className={price !== '' ? 'focus' : ''}
                        type="number"
                        step={"any"}
                        id='price'
                        value={price}
                        onChange={e => setPrice(e.target.value)} />
                    <label htmlFor="price">
                        Цена за единицу
                    </label>
                </div>
                <div className="login__button" onClick={create}>Сохранить</div>
            </div>
        </div>
    );
};

export default Rate;