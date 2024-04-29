import React, { useContext, useEffect, useState } from 'react';
import useMainService from '../services/MainService';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { PopupContext } from '../providers/PopupProvider';

const News = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const { role } = useContext(AuthContext);
    const { createNews, getNewsById, editNews } = useMainService();
    const navigate = useNavigate();
    const { data, setData } = useContext(PopupContext);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    useEffect(() => {
        if (role.filter(item => item.name === "ROLE_ADMIN" || item.name === "ROLE_KSK").length === 0) {
            navigate("/");
        }
    }, [])

    useEffect(() => {
        if (id)
            getNewsById(id)
                .then(data => {
                    setTitle(data.title);
                    setDesc(data.text);
                })
                .catch(err => console.log(err));
    }, [id]);

    const create = () => {
        if (title === '' || desc === '') {
            setData({ show: true, text: 'Введите корректные данные!', title: 'Ошибка ввода' })
            return;
        }

        const now = new Date();

        const news = {
            title,
            text: desc,
            date:
                `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`,
        }

        if (id) {
            editNews(id, news)
                .then(data => {
                    navigate('/profile')
                }).catch(err => console.log(err));
        } else
            createNews(news)
                .then(() => {
                    navigate("/");
                })
                .catch(err => console.log(err));
    }


    return (
        <div className='login'>
            <div className="login__row">
                <div className="login__title">Создать новость</div>
                <div className="login__input">
                    <input autoComplete='off'
                        className={title !== '' ? 'focus' : ''}
                        type="text"
                        id='title'
                        value={title}
                        onChange={e => setTitle(e.target.value)} />
                    <label htmlFor="title">
                        Заголовок
                    </label>
                </div>
                <div className="login__input">
                    <textarea
                        className={'big' + (desc !== '' ? ' focus' : '')}
                        type="text"
                        id='text'
                        value={desc}
                        onChange={e => setDesc(e.target.value)} ></textarea>
                    <label htmlFor="text">
                        Описание
                    </label>
                </div>
                <div className="login__button" onClick={create}>Сохранить</div>
            </div>
        </div>
    );
};

export default News;