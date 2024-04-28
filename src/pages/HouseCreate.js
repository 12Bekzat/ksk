import React, { useContext, useEffect, useState } from 'react';
import useMainService from '../services/MainService';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { PopupContext } from '../providers/PopupProvider';

const HouseCreate = () => {
    const [address, setAddress] = useState('');
    const [square, setSquare] = useState(0);
    const [count, setCount] = useState(0);
    const [jkhId, setJkhId] = useState(-1);
    const [allJkh, setAllJkh] = useState([]);
    const { getAllJkh, addHouse, getHouseById, editHouse } = useMainService();
    const { role } = useContext(AuthContext);
    const navigate = useNavigate();
    const { setData } = useContext(PopupContext);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const handleAllJkhLoad = () => {
        getAllJkh()
            .then(data => {
                setAllJkh(data);
                setJkhId(data[0].id);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        if (role.filter(item => item.name == "ROLE_ADMIN").length > 0)
            handleAllJkhLoad();
    }, [role])

    const create = () => {
        if (address == '' ||
            square == 0 ||
            count == 0 ||
            jkhId == -1) {
            setData({ show: true, text: 'Введите корректные данные!', title: 'Ошибка' });
            return;
        }



        const house = {
            address, square, countOfPeople: count, jkhId
        }

        addHouse(id, house)
            .then(data => {
                navigate("/profile")
            })
            .catch(err => console.log(err));

    }

    return (
        <div className='login'>
            <div className="login__row">
                <div className="login__title">Создать дом</div>
                <div className="login__input">
                    <input autoComplete='off'
                        className={address !== '' ? 'focus' : ''}
                        type="text"
                        id='address'
                        value={address}
                        onChange={e => setAddress(e.target.value)} />
                    <label htmlFor="address">
                        Адрес
                    </label>
                </div>
                <div className="login__input">
                    <input autoComplete='off'
                        className={square !== '' ? 'focus' : ''}
                        type="number"
                        id='square'
                        step={"any"}
                        min={0}
                        value={square}
                        onChange={e => setSquare(e.target.value)} />
                    <label htmlFor="square">
                        Площадь
                    </label>
                </div>
                <div className="login__input">
                    <input autoComplete='off'
                        className={count !== '' ? 'focus' : ''}
                        type="text"
                        id='count'
                        min={1}
                        value={count}
                        onChange={e => setCount(e.target.value)} />
                    <label htmlFor="count">
                        Кол-во людей
                    </label>
                </div>
                <div className="login__input">
                    <select onChange={e => setJkhId(e.target.value)} value={jkhId}>
                        {allJkh.map(item =>
                            (<option value={item.id} key={item.id}>{item.name}</option>))}
                    </select>
                    <label>ЖКХ</label>
                </div>
                <div className="login__button" onClick={create}>Сохранить</div>
            </div>
        </div>
    );
};

export default HouseCreate;