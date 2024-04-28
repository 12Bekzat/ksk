import React, { useContext, useEffect, useMemo, useState } from 'react';
import useMainService from '../services/MainService';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import NewsItem from '../components/newsItem/NewsItem';

const Home = () => {
    const { getNews } = useMainService();
    const [news, setNews] = useState([]);
    const { role } = useContext(AuthContext);

    useEffect(() => {
        getNews()
            .then(data => {
                setNews(data);
            })
            .catch(err => console.log(err));
    }, [])

    const newsElement = useMemo(() => (
        news.map(item => (
            <NewsItem key={item.id} title={item.title} text={item.text} date={item.date} />
        ))
    ), [news]);

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
                            <div className="payment__item">
                                <div className="payment__title">Электроэнергия</div>
                                <div className="payment__price">3748.00 ₸</div>
                                <div className="payment__btn">Подробнее</div>
                            </div>
                            <div className="payment__item">
                                <div className="payment__title">Отопление</div>
                                <div className="payment__price">1848.12 ₸</div>
                                <div className="payment__btn">Подробнее</div>
                            </div>
                            <div className="payment__item">
                                <div className="payment__title">Вода</div>
                                <div className="payment__price">2795.34 ₸</div>
                                <div className="payment__btn">Подробнее</div>
                            </div>
                        </div>
                    </div>
                    <div className="forms__button">Оплатить всё</div>
                </div>
            </div>
            <div className="title">Услуги</div>
            <div className="services">
                <div className="services__item">
                    <div className="services__title">Сантехник</div>
                    <div className="services__text">Цена: Договорная</div>
                    <div className="services__button">Заказать услугу</div>
                </div>
                <div className="services__item">
                    <div className="services__title">Электрик</div>
                    <div className="services__text">Цена: Договорная</div>
                    <div className="services__button">Заказать услугу</div>
                </div>
                <div className="services__item">
                    <div className="services__title">Разнорабочий</div>
                    <div className="services__text">Цена: Договорная</div>
                    <div className="services__button">Заказать услугу</div>
                </div>
            </div>
        </div>
    );
};

export default Home;