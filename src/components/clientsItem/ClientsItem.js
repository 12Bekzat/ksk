import React, { useContext, useEffect, useState } from 'react';
import useMainService from '../../services/MainService';
import { PopupContext } from '../../providers/PopupProvider';
import { Link } from 'react-router-dom';

const ClientsItem = ({ fullName, username, houseAddress, houseSquare, houseCount, id, ownerId, jkhId, onUpdate }) => {
    const [address, setAddress] = useState('');
    const [square, setSquare] = useState(0);
    const [count, setCount] = useState(1);
    const [save, setSave] = useState(false);
    const [open, setOpen] = useState(false);
    const { editHouse, removeHouse, removeClient } = useMainService();
    const { setData } = useContext(PopupContext);

    useEffect(() => {
        setAddress(houseAddress);
    }, [houseAddress])

    useEffect(() => {
        setSquare(parseFloat(houseSquare));
    }, [houseSquare])

    useEffect(() => {
        setSquare(parseInt(houseCount));
    }, [houseCount])

    const changeHouseEvent = () => {
        if (address == "" || square == "" || count == "") {
            setData({ show: true, text: 'Заблокировать пользователя не получилось!', title: 'Ошибка' });
            return;
        }

        const house = { address, square, countOfPeople: count, id }

        editHouse(house)
            .then(data => {
                setSave(false);
                onUpdate();
            })
            .catch(err => console.log(err));
    }

    const removeHouseEvent = () => {
        const house = { address, square, countOfPeople: count, id, jkhId, owner: { id: ownerId } }

        removeHouse(house)
            .then(data => {
                onUpdate();
            })
            .catch(err => console.log(err));
    }

    const removeClientEvent = () => {
        const house = { id, jkhId }

        removeClient(house)
            .then(data => {
                onUpdate();
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='clients__item'>
            <div className="clients__row">
                <div className="clients__content">
                    <div className="clients__title">{fullName}</div>
                    <div className="clients__text">{username}</div>
                </div>
                <div className="clients__buttons">
                    <button className='del' onClick={removeHouseEvent}>
                        <i className="fa-solid fa-house-circle-xmark"></i>
                    </button>
                    <button className='del' onClick={removeClientEvent}>
                        <i className="fa-solid fa-trash-can"></i>
                    </button>
                    <div className={"clients__icon" + (open ? " open" : "")}
                        onClick={() => { setOpen(open => !open) }}>
                        <i className="fa-solid fa-square-caret-up"></i>
                    </div>
                </div>
            </div>
            <div className={"clients__data" + (open ? " open" : "")}>
                <div className="clients__input">
                    <input autoComplete='off'
                        className={address !== '' ? 'focus' : ''}
                        disabled={!save}
                        type="text"
                        id='address'
                        value={address}
                        onChange={e => setAddress(e.target.value)} />
                    <label htmlFor="address">
                        Адрес
                    </label>
                </div>
                <div className={"clients__input"}>
                    <input autoComplete='off'
                        className={square !== '' ? 'focus' : ''}
                        disabled={!save}
                        type="number"
                        min={0}
                        id='square'
                        value={square}
                        onChange={e => setSquare(e.target.value)} />
                    <label htmlFor="square">
                        Площадь
                    </label>
                </div>
                <div className="clients__input">
                    <input autoComplete='off'
                        className={count !== '' ? 'focus' : ''}
                        disabled={!save}
                        type="number"
                        min={1}
                        id='count'
                        value={count}
                        onChange={e => setCount(e.target.value)} />
                    <label htmlFor="count">
                        Кол-ко жителей
                    </label>
                </div>
                <div className="clients__action">
                    {!save ?
                        <button className="clients__button" onClick={() => setSave(true)}>
                            Изменить
                        </button> :
                        <button className="clients__button" onClick={changeHouseEvent}>
                            Сохранить
                        </button>}
                </div>
            </div>
        </div>
    );
};

export default ClientsItem;