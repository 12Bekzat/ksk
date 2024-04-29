import React, { useContext, useEffect, useMemo, useState } from 'react';
import useMainService from '../services/MainService';
import PaymentItem from '../components/paymentItem/PaymentItem';
import ReactInputMask from 'react-input-mask';
import { LoaderContext } from '../providers/LoaderProvider';
import { PopupContext } from '../providers/PopupProvider';
import { useNavigate } from 'react-router-dom';

const Pay = () => {
    const [payments, setPayments] = useState([]);
    const [selectPayment, setSelectedPayment] = useState(-1);
    const [bankAccount, setBankAccount] = useState('');
    const [expire, setExpire] = useState('');
    const [cvv, setCvv] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [me, setMe] = useState(null);
    const { getUserPayments, getUserPaymentsExpired, getUserInfo, payPayment } = useMainService();
    const { show, setShow, time } = useContext(LoaderContext);
    const { setData } = useContext(PopupContext);
    const navigate = useNavigate();

    useEffect(() => {
        getUserInfo()
            .then(data => {
                setMe(data);
            })
            .catch(err => console.log(err));

    }, [])

    useEffect(() => {
        if (me) {
            handlePaymentEvent();
        }
    }, [me])

    const handlePaymentEvent = () => {
        getUserPaymentsExpired(me.id)
            .then(() => {
                getUserPayments(me.id)
                    .then(data => {
                        setPayments(data)
                        setSelectedPayment(data[0].id)
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }

    const pay = () => {
        if (bankAccount == "" || expire == "" || cvv == "" || ownerName == "") {
            setData({ show: true, text: 'Введите корректные данные!', title: 'Ошибка' });
            return;
        }

        setShow(true);

        const timeOut = setTimeout(() => {
            payPayment(selectPayment)
                .then(() => {
                    navigate("/");
                    clearTimeout(timeOut);
                })
                .catch(err => {
                    setData({ show: true, text: 'При оплате что то пошло не так!', title: 'Ошибка оплаты!' });
                    console.log(err);
                    clearTimeout(timeOut);
                })
        }, time)
    }

    return (
        <div className='login'>
            <div className="login__row">
                <div className="login__title">Оплатить счета</div>
                <div className="login__input">
                    <select onChange={e => setSelectedPayment(e.target.value)} value={selectPayment}>
                        {payments.map((item, index) => <option key={item.id} value={item.id}>Payment {index + 1}</option>)}
                    </select>
                    <label>Роль</label>
                </div>
                <div className="login__list">
                    {payments.map(payment => (
                        payment.id == selectPayment ? payment.counters.map(item => (
                            <PaymentItem key={item.id} id={item.rate} meter={item.meterReadings} status={payment.status} />
                        )) : null
                    ))}
                </div>
                <div className="login__input">
                    <ReactInputMask
                        autoComplete='off'
                        mask={"9999-9999-9999-9999"}
                        className={bankAccount !== '' ? 'focus' : ''}
                        type="text"
                        id='bankAccount'
                        value={bankAccount}
                        onChange={e => setBankAccount(e.target.value)} />
                    <label htmlFor="bankAccount">
                        Номер банковской карты
                    </label>
                </div>
                <div className="login__grid">
                    <div className="login__input">
                        <ReactInputMask
                            autoComplete='off'
                            mask={"99/99"}
                            className={expire !== '' ? 'focus' : ''}
                            type="text"
                            id='expire'
                            value={expire}
                            onChange={e => setExpire(e.target.value)} />
                        <label htmlFor="expire">
                            Действует до
                        </label>
                    </div>
                    <div className="login__input">
                        <ReactInputMask
                            mask={"999"}
                            autoComplete='off'
                            className={cvv !== '' ? 'focus' : ''}
                            type="text"
                            id='cvv'
                            value={cvv}
                            onChange={e => setCvv(e.target.value)} />
                        <label htmlFor="cvv">
                            CVV
                        </label>
                    </div>
                </div>
                <div className="login__input">
                    <input
                        autoComplete='off'
                        className={ownerName !== '' ? 'focus' : ''}
                        type="text"
                        id='ownerName'
                        value={ownerName}
                        onChange={e => setOwnerName(e.target.value)} />
                    <label htmlFor="ownerName">
                        Имя владельца
                    </label>
                </div>
                <div className="login__button" onClick={pay}>Оплатить</div>
            </div>
        </div>
    );
};

export default Pay;