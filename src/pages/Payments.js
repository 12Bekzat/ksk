import React, { useEffect, useMemo, useState } from 'react';
import useMainService from '../services/MainService';

const Payments = () => {
    const [energy, setEnergy] = useState({ prev: '', value: '', visible: true });
    const [warmWater, setWarmWater] = useState({ prev: '', value: '', visible: true });
    const [coldWater, setColdWater] = useState({ prev: '', value: '', visible: true });
    const [heating, setHeating] = useState({ value: '', visible: true });
    const [trash, setTrash] = useState({ value: '', visible: true });
    const [lift, setLift] = useState({ value: '', visible: true });
    const [clean, setClean] = useState({ value: '', visible: true });
    const [camera, setCamera] = useState({ value: '', visible: true });
    const [extra, setExtra] = useState({ value: '', visible: true });
    const [choose, setChoose] = useState('');

    const [users, setUsers] = useState([]);

    const { createUserWithRole, createUserWithHouse, getUsers, removeUser } = useMainService();

    useEffect(() => {
        getUsers()
            .then(data => {
                setUsers(data);
            })
            .catch(e => console.log(e))
    }, [])

    const send = () => {

    }

    const energyElement = useMemo(() => (energy.visible ? <div className="create__input double">
        <input autoComplete='off'
            value={energy.prev}
            onChange={e => setEnergy(energy => ({ prev: e.target.value, value: energy.value, visible: energy.visible }))}
            type="number" placeholder='Предыдущие' />
        <input autoComplete='off' value={energy.value}
            onChange={e => setEnergy(energy => ({ prev: energy.prev, value: e.target.value, visible: energy.visible }))}
            type="number" placeholder='Текущие' />
        <label>
            Электроэнергия
        </label>
        <div className="create__hide"
            onClick={() => {
                setEnergy(({ value, prev }) => ({ value, prev, visible: false }))
            }}>
            <i className="fa-solid fa-minus"></i>
        </div>
    </div> : null), [energy]);

    const warmWaterElement = useMemo(() => (warmWater.visible ? <div className="create__input double">
        <input autoComplete='off' value={warmWater.prev}
            onChange={e => setWarmWater(warmWater => ({ prev: e.target.value, value: warmWater.value, visible: warmWater.visible }))}
            type="number" placeholder='Предыдущие' />
        <input autoComplete='off' value={warmWater.value}
            onChange={e => setWarmWater(warmWater => ({ prev: warmWater.prev, value: e.target.value, visible: warmWater.visible }))}
            type="number" placeholder='Текущие' />
        <label>
            Горячая вода
        </label>
        <div className="create__hide"
            onClick={() => {
                setWarmWater(({ value, prev }) => ({ value, prev, visible: false }))
            }}>
            <i className="fa-solid fa-minus"></i>
        </div>
    </div> : null), [warmWater])

    const coldWaterElement = useMemo(() => (coldWater.visible ? < div className="create__input double" >
        <input autoComplete='off' value={coldWater.prev}
            onChange={e => setColdWater(coldWater => ({ prev: e.target.value, value: coldWater.value, visible: coldWater.visible }))}
            type="number" placeholder='Предыдущие' />
        <input autoComplete='off' value={coldWater.value}
            onChange={e => setColdWater(coldWater => ({ prev: coldWater.value, value: e.target.value, visible: coldWater.visible }))}
            type="number" placeholder='Текущие' />
        <label>
            Холодная вода
        </label>
        <div className="create__hide"
            onClick={() => {
                setColdWater(({ value, prev }) => ({ value, prev, visible: false }))
            }}>
            <i className="fa-solid fa-minus"></i>
        </div>
    </ div> : null), [coldWater]);

    const heatingElement = useMemo(() => (heating.visible ? <div className="create__input">
        <input autoComplete='off' value={heating.value} disabled
            onChange={e => setHeating(heating => ({ value: e.target.value, visible: heating.visible }))}
            type="number" id='warm' />
        <label htmlFor='warm'>
            Отопление
        </label>
        <div className="create__hide"
            onClick={() => {
                setHeating(({ value }) => ({ value, visible: false }))
            }}>
            <i className="fa-solid fa-minus"></i>
        </div>
    </div> : null), [heating])

    const trashElement = useMemo(() => (trash.visible ? <div className="create__input" >
        <input autoComplete='off' value={trash.value} disabled
            onChange={e => setTrash(trash => ({ value: e.target.value, visible: trash.visible }))}
            type="number" id='trash' />
        <label htmlFor='trash'>
            Вывоз ТБО
        </label>
        <div className="create__hide"
            onClick={() => {
                setTrash(({ value }) => ({ value, visible: false }))
            }}>
            <i className="fa-solid fa-minus"></i>
        </div>
    </div> : null), [trash])

    const liftElement = useMemo(() => (lift.visible ? <div className="create__input">
        <input autoComplete='off' value={lift.value} disabled
            onChange={e => setLift(lift => ({ value: e.target.value, visible: lift.visible }))}
            type="number" id='up' />
        <label htmlFor='up'>
            Лифт
        </label>
        <div className="create__hide"
            onClick={() => {
                setLift(({ value }) => ({ value, visible: false }))
            }}>
            <i className="fa-solid fa-minus"></i>
        </div>
    </div> : null), [lift])
    const cleanElement = useMemo(() => (clean.visible ? <div className="create__input">
        <input autoComplete='off' value={clean.value} disabled
            onChange={e => setClean(clean => ({ value: e.target.value, visible: clean.visible }))}
            type="number" id='clean' />
        <label htmlFor='clean'>
            Уборка подьездов
        </label>
        <div className="create__hide"
            onClick={() => {
                setClean(({ value }) => ({ value, visible: false }))
            }}>
            <i className="fa-solid fa-minus"></i>
        </div>
    </div> : null), [clean])

    const cameraElement = useMemo(() => (camera.visible ? <div className="create__input">
        <input autoComplete='off' value={camera.value} disabled
            onChange={e => setCamera(camera => ({ value: e.target.value, visible: camera.visible }))}
            type="number" id='camera' />
        <label htmlFor='camera'>
            Видеонаблюдение
        </label>
        <div className="create__hide"
            onClick={() => {
                setCamera(({ value }) => ({ value, visible: false }))
            }}>
            <i className="fa-solid fa-minus"></i>
        </div>
    </div> : null), [camera]);

    const extraElement = useMemo(() => (extra.visible ? <div className="create__input">
        <input autoComplete='off' value={extra.value} disabled
            onChange={e => setExtra(extra => ({ value: e.target.value, visible: extra.visible }))}
            type="number" id='extra' />
        <label htmlFor='extra'>
            Аварийно тех-обслуживание
        </label>
        <div className="create__hide"
            onClick={() => {
                setExtra(({ value }) => ({ value, visible: false }))
            }}>
            <i className="fa-solid fa-minus"></i>
        </div>
    </div> : null), [extra]);


    return (
        <div className='main__row'>
            <div className="create">
                {energyElement}
                {warmWaterElement}
                {coldWaterElement}
                {heatingElement}
                {trashElement}
                {liftElement}
                {cleanElement}
                {cameraElement}
                {extraElement}
                <div className="create__input">
                    <select onChange={e => setChoose(e.target.value)} value={choose}>
                        {users.map(item => (
                            <option key={item.id} value={item.username}>{item.name} {item.surname}</option>
                        ))}
                    </select>
                    <label>Пользователь</label>
                </div>


                <div className="create__button">
                    Создать
                </div>
            </div>
        </div>
    );
};

export default Payments;