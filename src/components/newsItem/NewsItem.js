import React, { useEffect, useMemo, useState } from 'react';
import useMainService from '../../services/MainService';
import { Link, useNavigate } from 'react-router-dom';

const NewsItem = ({ title, text, date, admin, id, onDelete }) => {
    const [hide, setHide] = useState(true);
    const [menu, setMenu] = useState(false);
    const { removeNews } = useMainService();
    const navigate = useNavigate();

    const showText = useMemo(() => {
        return admin ? text : (hide ? (text.length > 46 ? (text.substring(0, 46) + '...') : text) : text);
    }, [text, hide]);

    const timeShow = () => {
        const doubler = (number) => (number < 10 ? '0' + number : number)

        const value = date.split(' ');
        const time = {
            day: parseInt(value[0].split('.')[0]),
            month: parseInt(value[0].split('.')[1]),
            year: parseInt(value[0].split('.')[2]),
            hour: parseInt(value[1].split(':')[0]),
            minute: parseInt(value[1].split(':')[1]),
        }

        return `${doubler(time.day)}.${doubler(time.month)}.${time.year} ${doubler(time.hour)}:${doubler(time.minute)}`;
    }

    const isMenu = (target) => {
        if (target.classList.contains('wrapper')) return false;
        if (target.classList.contains('news__list') || target.classList.contains('news__manage')) {
            return target.id == id;
        }
        return isMenu(target.parentElement);
    }

    const hideMenu = (e) => {
        if (!isMenu(e.target))
            setMenu(false);
    }

    useEffect(() => {
        if (menu) {
            document.addEventListener('click', hideMenu);
        } else {
            document.removeEventListener('click', hideMenu);
        }

        return () => {
            document.removeEventListener('click', hideMenu);
        }
    }, [menu]);

    return (
        <div className="news__item" onClick={(e) => {
            if (!admin)
                setHide((hide) => !hide);
        }}>
            <div className={"news__row" + (admin ? ' admin' : '')}>
                <div className="news__author">{timeShow()}</div>
                <div className="news__title">{title}</div>
                <div className="news__text">{showText}</div>
                {admin ? <>
                    <div id={id} className={"news__manage"} onClick={() => setMenu(true)}>
                        <span className='news__manage-point'></span>
                        <span className='news__manage-point'></span>
                        <span className='news__manage-point'></span>
                    </div>
                    <div id={id} className={"news__list" + (menu ? '' : ' hide')}>
                        <div className="news__list-item"
                            onClick={() => {
                                removeNews(id)
                                    .then(data => {
                                        onDelete();
                                    })
                                    .catch(err => console.log(err));
                            }}>Удалить</div>
                        <div onClick={() => {
                            navigate('/news?id=' + id);
                        }} className="news__list-item">Редактировать</div>
                    </div>
                </> : null}
            </div>
        </div>
    );
};

export default NewsItem;