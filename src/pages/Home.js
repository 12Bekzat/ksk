import React, { useContext, useEffect, useMemo, useState } from 'react';
import useMainService from '../services/MainService';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import NewsItem from '../components/newsItem/NewsItem';
import PaymentItem from '../components/paymentItem/PaymentItem';

const Home = () => {
    const { getNews, getUserPayments, getUserInfo, getUserPaymentsExpired } = useMainService();
    const [news, setNews] = useState([]);
    const [me, setMe] = useState(null);
    const [payments, setPayments] = useState([]);
    const { role } = useContext(AuthContext);

    useEffect(() => {
        getNews()
            .then(data => {
                setNews(data);
            })
            .catch(err => console.log(err));

        getUserInfo()
            .then(data => {
                console.log(data);
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
                        console.log("payments", data);
                        setPayments(data)
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }

    const newsElement = useMemo(() => (
        news.map(item => (
            <NewsItem key={item.id} title={item.title} text={item.text} date={item.date} />
        ))
    ), [news]);

    const ratesElement = useMemo(() => (
        payments.map(payment => (
            <div className='payment__row' key={payment.id}>
                <div className="payment__head">Payment</div>
                {payment.counters.map(item => (
                    <PaymentItem key={item.id} id={item.rate} meter={item.meterReadings} status={payment.status} />
                ))}
            </div>
        ))
    ), [payments]);

    return (
        <div className='main__row'>
            <div className="forms">
                <div className="forms__table">
                    <div className="forms__title">Новости</div>
                    <div className="forms__data">
                        <div className="news">
                            {newsElement}
                        </div>
                    </div>
                    {!role.includes("ROLE_USER") ? <Link to={"/news"} className="forms__button">Создать новости</Link> : null}
                </div>
                <div className="forms__table">
                    <div className="forms__title">Счета</div>
                    <div className="forms__data">
                        <div className="payment" id="payments">
                            {ratesElement}
                        </div>
                    </div>
                    {payments.length > 0 ? <Link to={"/pay"} className="forms__button">Оплатить счёт</Link> : null}
                </div>
            </div>
        </div>
    );
};

export default Home;