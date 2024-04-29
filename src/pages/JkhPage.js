import React, { useContext, useEffect, useMemo, useState } from 'react';
import useMainService from '../services/MainService';
import { Link, useNavigate, useParams } from 'react-router-dom';
import UsersItem from '../components/usersItem/UsersItem';
import NewsItem from '../components/newsItem/NewsItem';
import JkhItem from '../components/jkhItem/JkhItem';
import EmployeeItem from '../components/employeeItem/EmployeeItem';
import { PopupContext } from '../providers/PopupProvider';
import ClientsItem from '../components/clientsItem/ClientsItem';

const JkhPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { getJkhById, getAllEmployee, addEmployeeJkh, getRates, createPayment } = useMainService();
    const [info, setInfo] = useState({})
    const [active, setActive] = useState(0);
    const [employee, setEmployee] = useState([]);
    const [rates, setRates] = useState([]);
    const [selected, setSelected] = useState('');
    const { setData } = useContext(PopupContext);
    const [client, setClient] = useState(-1);

    useEffect(() => {
        handleJkhLoad();
        handleEmployeeLoad();
        handleRatesLoad();
    }, [id])

    useEffect(() => {
        console.log(employee);
    }, [employee])

    const handleRatesLoad = () => {
        getRates()
            .then(data => {
                setRates(data.map(item => ({ ...item, meter: 0, removalDate: '', check: true })));
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleJkhLoad = () => {
        getJkhById(id)
            .then(data => {
                setInfo(data);
                setClient(data.clients[0].owner.id);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleEmployeeLoad = () => {
        getAllEmployee()
            .then(data => {
                console.log("Employee", data);
                if (data.length > 0) {
                    setEmployee(data);
                    setSelected(data[0].id)
                    setClient(data[0].id)
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const usersInfo = useMemo(() => (
        info.employee ? info.employee.map(item => (
            <EmployeeItem
                key={item.id}
                fullName={item.fullName}
                username={item.username}
                jkhId={id}
                onDelete={handleJkhLoad}
                id={item.id} />
        )) : null
    ), [info]);

    const clientsInfo = useMemo(() => (
        info.clients ? info.clients.map(item => (
            <ClientsItem key={item.id}
                fullName={item.owner.fullName}
                username={item.owner.username}
                ownerId={item.owner.id}
                jkhId={item.jkhId}
                houseAddress={item.address}
                houseSquare={item.square}
                houseCount={item.countOfPeople}
                onUpdate={handleJkhLoad}
                id={item.id}
            />
        )) : null
    ), [info]);

    const addEmployee = () => {
        console.log(selected);
        if (selected != '') {
            addEmployeeJkh(id, selected)
                .then(data => {
                    setData({ show: true, text: 'Пользователь успешно добавлен!', title: 'Добавлен' });
                    handleJkhLoad();
                    handleEmployeeLoad();
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    const rateInfo = useMemo(() => {
        return rates.map((item, index) => (
            <div className="counter__row" key={item.id}>
                <div className="counter__input">
                    <input autoComplete='off'
                        className={'focus'}
                        type="text"
                        disabled={true}
                        id='username'
                        value={item.name} />
                    <label htmlFor="username">
                        Тариф
                    </label>
                    <div className={"counter__icon" + (item.check ? " check" : "")}
                        onClick={() => setRates(rates => rates.map((rt, rtInd) => (rtInd == index ? { ...rt, check: !rt.check } : rt)))}>
                        <i className="fa-solid fa-circle-check check"></i>
                        <i className="fa-solid fa-circle-xmark uncheck"></i>
                    </div>
                </div>
                <div className="counter__input">
                    <input autoComplete='off'
                        className={item.meter !== '' ? 'focus' : ''}
                        type="number"
                        step={"any"}
                        id='meter'
                        min={0}
                        value={item.meter}
                        onChange={e => setRates(rates => (rates.map((it, ind) => {
                            return ind == index ? { ...it, meter: parseFloat(e.target.value) > 0 ? parseFloat(e.target.value) : it.meter } : it
                        })))} />
                    <label htmlFor="meter">
                        Показания счетчика
                    </label>
                </div>
                <div className="counter__input">
                    <input autoComplete='off'
                        className={'focus'}
                        type="date"
                        id='removalDate'
                        value={item.removalDate}
                        onChange={e => setRates(rates => (rates.map((it, ind) => {
                            return ind == index ? { ...it, removalDate: e.target.value } : it
                        })))} />
                    <label htmlFor="removalDate">
                        Дата снятия
                    </label>
                </div>
            </div>
        ))
    }, [rates]);

    const paymentSend = () => {
        console.log(rates.filter(rate => (rate.check && (rate.removalDate == '' || rate.meter == 0))).length != 0);
        console.log(client);
        if (rates.filter(rate => (rate.check && (rate.removalDate == '' || rate.meter == 0))).length != 0 || client == -1) {
            setData({ show: true, text: 'Введите корректные информации.', title: 'Ошибка!' });
            return;
        }

        const payment = {
            price: rates.reduce((acc, current) => acc + (current.check ? (current.price * current.meter) : 0), 0),
            user: {
                id: client
            },
            jkh: {
                id: info.id
            },
            counters: rates.filter(rate => rate.check).map(rate => {
                return {
                    meterReadings: rate.meter,
                    removalDate: rate.removalDate,
                    rate: rate.id,
                }
            })
        };
        console.log("payment", payment);
        createPayment(info.id, client, payment)
            .then(data => {
                setData({ show: true, text: 'Квитанция за ком. услуги успешно отправлено.', title: 'Ком. услуги' });
            })
            .catch(err => console.log(err));
    }

    function addThousandSeparators(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    return (
        <div className='main__row' style={{ 'alignItems': 'center' }}>
            <div className="profile">
                <div className="profile__content">
                    <div className="profile__title">
                        {info.name}
                        <Link to={"/jkh?id=" + id} className="profile__edit">
                            <i className="fa-solid fa-pen-to-square"></i>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="orders">
                <div className="orders__header">
                    <div
                        className={"orders__top" + (active === 0 ? ' active' : '')}
                        onClick={() => { setActive(0) }}>
                        Сотрудники
                    </div>
                    <div
                        className={"orders__top" + (active === 1 ? ' active' : '')}
                        onClick={() => { setActive(1) }}>
                        Платежи
                    </div>
                    <div
                        className={"orders__top" + (active === 2 ? ' active' : '')}
                        onClick={() => { setActive(2) }}>
                        Жильцы
                    </div>
                </div>

                <div className="orders__body">
                    <div className={"orders__container" + (active === 0 ? ' active' : '')}>
                        {employee.length > 0 ? <div className="orders__filter">
                            <div className="orders__input">
                                <select onChange={e => setSelected(e.target.value)} value={selected}>
                                    {employee.map(item => (
                                        <option key={item.id} value={item.id}>{item.fullName}</option>
                                    ))}
                                </select>
                                <label>Сотрудники</label>
                            </div>
                            <button className="orders__button"
                                onClick={addEmployee}>
                                <i className="fa-solid fa-user-plus"></i>
                            </button>
                        </div> : null}
                        <div className="users">
                            {usersInfo}
                        </div>
                    </div>
                    <div className={"orders__container" + (active === 1 ? ' active' : '')}>
                        <div className="counter">
                            <div className="counter__title">Счета</div>
                            <div className="counter__form">
                                {rateInfo}
                                <div className="counter__row">
                                    <div className="counter__input">
                                        <select onChange={e => setClient(e.target.value)} value={client}>
                                            {info.clients ? info.clients.map(client =>
                                                (<option key={client.id} value={client.owner.id}>{client.owner.fullName}</option>)) : null}
                                        </select>
                                        <label>Житель</label>
                                    </div>
                                    <div className="counter__input">
                                        <div className="counter__field">
                                            {info.name}
                                        </div>
                                        <label>
                                            ЖКХ
                                        </label>
                                    </div>
                                    <div className="counter__text">
                                        Общая сумма: {
                                            addThousandSeparators(rates.reduce((acc, current) => acc + (current.price * current.meter), 0))} ₸
                                    </div>
                                </div>
                                <div className="counter__row">
                                    <div className="counter__button" onClick={paymentSend}>Отправить</div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className={"orders__container" + (active === 2 ? ' active' : '')}>
                        <div className="clients">
                            {clientsInfo}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JkhPage;