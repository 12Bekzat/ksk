import React, { useContext, useEffect, useMemo, useState } from 'react';
import useMainService from '../services/MainService';
import { AuthContext } from '../providers/AuthProvider';
import { PopupContext } from '../providers/PopupProvider';
import { Link } from 'react-router-dom';
import UsersItem from '../components/usersItem/UsersItem';
import NewsItem from '../components/newsItem/NewsItem';
import JkhItem from '../components/jkhItem/JkhItem';
import RateItem from '../components/rateItem/RateItem';

const Profile = () => {
    const [myInfo, setMyInfo] = useState({ fullname: '', username: '', id: -1 });
    const [previewImg, setPreviewImg] = useState(null);
    const [active, setActive] = useState(0);
    const { getUserInfo, setLogo, getLogo } = useMainService();
    const { role, setAuth, setRole } = useContext(AuthContext);
    const { setData } = useContext(PopupContext);

    useEffect(() => {
        getUserInfo()
            .then(data => {
                setMyInfo({ fullname: data.fullName, username: data.username, id: data.id })
                if (data.avatarId !== -1) {
                    getLogo(data.avatarId)
                        .then(buffer => {
                            const base64Image = btoa(
                                new Uint8Array(buffer).reduce(
                                    (data, byte) => data + String.fromCharCode(byte),
                                    ''
                                )
                            );
                            setPreviewImg(`data:image/jpeg;base64,${base64Image}`);
                        })
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleFileChange = (event) => {
        const fileData = event.target.files[0];
        const formData = new FormData();
        formData.append('file', fileData);

        setLogo(formData)
            .then(data => {
                setData({ show: true, text: 'Логотип успешно изменен', title: 'Изменено' });
                setPreviewImg(URL.createObjectURL(fileData));
            })
            .catch(err => {
                console.log(err);
                setData({ show: true, text: 'Произошла ошибка!', title: 'Ошибка!' });
            });
    };

    const avatar = useMemo(() => {
        return previewImg ? <img src={previewImg} /> : <i className="fa-solid fa-user profile__img-icon"></i>
    }, [previewImg]);

    return (
        <div className='main__row' style={{ 'alignItems': 'center' }}>
            <div className="profile">
                <div className={"profile__img" + (previewImg ? ' img' : '')}>
                    {avatar}
                    <div className="profile__file">
                        <input autoComplete='off' id='avatar' accept="image/*" type="file" onChange={handleFileChange} />
                        <label htmlFor="avatar">
                            <i className="fas fa-camera"></i>
                        </label>
                    </div>
                </div>
                <div className="profile__content">
                    <div className="profile__title">
                        {myInfo.fullname}
                        <Link to={"/user/edit/" + myInfo.id + "?me=true"} className="profile__edit">
                            <i className="fa-solid fa-pen-to-square"></i>
                        </Link>
                    </div>
                    <div className="profile__username">
                        {myInfo.username}
                    </div>
                    <div className="profile__button"
                        onClick={() => {
                            localStorage.removeItem('token');
                            setRole([]);
                            setAuth(false);
                        }}>
                        Выйти c аккаунта
                    </div>
                </div>
            </div>
            {role.filter(item => item.name === "ROLE_ADMIN").length !== 0 ?
                <AdminTag active={active} setActive={setActive} role={role} /> : null
            }

            {role.filter(item => item.name === "ROLE_KSK").length !== 0 ?
                <EmployeeTag active={active} setActive={setActive} role={role} id={myInfo.id} /> : null
            }
        </div>
    );
};

const EmployeeTag = ({ active, setActive, role, id }) => {
    const [users, setUsers] = useState([]);
    const [news, setNews] = useState([]);
    const [search, setSearch] = useState('');
    const [myJkh, setMyJkh] = useState({});
    const { getNews, getUsers, getUserJkh } = useMainService();

    useEffect(() => {
        handleNewsLoad();
        handleUserLoad();
        handleMyJkhLoad();
    }, [role, id]);

    const handleSearch = (searchTerm) => {
        const results = users.map(item =>
            item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ? { ...item, show: true } : { ...item, show: false }
        );

        setUsers(results);
    };

    function sortUsersByFullName() {
        let array = [...users].sort((a, b) => {
            if (a.fullName < b.fullName) {
                return -1;
            }
            if (a.fullName > b.fullName) {
                return 1;
            }
            return 0;
        });

        setUsers(array);
    }

    function sortUsersByFullNameReverse() {
        let array = [...users].sort((a, b) => {
            if (a.fullName > b.fullName) {
                return -1;
            }
            if (a.fullName < b.fullName) {
                return 1;
            }
            return 0;
        })

        setUsers(array);
    }

    const handleNewsLoad = () => {
        getNews()
            .then(data => {
                setNews(data);
            })
            .catch(err => console.log(err));
    }

    const handleUserLoad = () => {
        getUsers()
            .then(data => {
                setUsers(data.map(item => ({ ...item, show: true })));
            })
            .catch(err => console.log(err));
    }

    const handleMyJkhLoad = () => {
        if (id)
            getUserJkh(id)
                .then(data => {
                    setMyJkh(data);
                })
                .catch(err => console.log(err));
    }

    const newsInfo = useMemo(() => {
        return news.map(item => (
            <NewsItem
                key={item.id}
                admin={true}
                onDelete={() => {
                    handleNewsLoad()
                }}
                id={item.id}
                title={item.title}
                text={item.text}
                date={item.date} />
        ))
    }, [news]);

    const usersInfo = useMemo(() => (
        users.map(item => (
            item.show ? <UsersItem
                key={item.id}
                banned={item.banned}
                home={item.home}
                onDelete={
                    handleUserLoad
                }
                fullName={item.fullName}
                username={item.username}
                id={item.id} /> : null
        ))
    ), [users]);

    const jkhInfo = useMemo(() => (
        <JkhItem
            name={myJkh.name}
            id={myJkh.id} />

    ), [myJkh]);

    return (
        <div className="orders">
            <div className="orders__header">
                <div
                    className={"orders__top" + (active === 0 ? ' active' : '')}
                    onClick={() => { setActive(0) }}>
                    Новости
                </div>
                <div
                    className={"orders__top" + (active === 1 ? ' active' : '')}
                    onClick={() => { setActive(1) }}>
                    Пользователи
                </div>
                <div
                    className={"orders__top" + (active === 2 ? ' active' : '')}
                    onClick={() => { setActive(2) }}>
                    Жкх
                </div>
            </div>

            <div className="orders__body">
                <div className={"orders__container" + (active === 0 ? ' active' : '')}>
                    <div className="orders__filter">
                        <Link to={"/news"} className="orders__button">
                            <i className="fa-solid fa-file-circle-plus"></i>
                        </Link>
                    </div>
                    <div className="news">
                        {newsInfo}
                    </div>
                </div>
                <div className={"orders__container" + (active === 1 ? ' active' : '')}>
                    <div className="orders__filter">
                        <div className="orders__input">
                            <input
                                autoComplete='off'
                                className={search !== '' ? 'focus' : ''}
                                type="text"
                                id='search'
                                value={search}
                                onChange={e => {
                                    handleSearch(e.target.value)
                                    setSearch(e.target.value)
                                }} />
                            <label htmlFor="search">
                                Поиск
                            </label>
                        </div>
                        <Link to={"/user/create"} className="orders__button">
                            <i className="fa-solid fa-user-plus"></i>
                        </Link>
                        <div className="orders__button" onClick={() => { sortUsersByFullName() }}>
                            <i className="fa-solid fa-arrow-up-a-z"></i>
                        </div>
                        <div className="orders__button" onClick={() => { sortUsersByFullNameReverse() }}>
                            <i className="fa-solid fa-arrow-down-z-a"></i>
                        </div>
                    </div>
                    <div className="users">
                        {usersInfo}
                    </div>
                </div>
                <div className={"orders__container" + (active === 2 ? ' active' : '')}>
                    <div className="orders__filter">
                        <Link to={"/jkh"} className="orders__button">
                            <i className="fa-solid fa-building-circle-arrow-right"></i>
                        </Link>
                    </div>
                    <div className="jkh">
                        {jkhInfo}
                    </div>
                </div>
            </div>
        </div>
    );
}

const AdminTag = ({ active, setActive, role, userId }) => {
    const [users, setUsers] = useState([]);
    const [allJkh, setAllJkh] = useState([]);
    const [myJkh, setMyJkh] = useState({});
    const [news, setNews] = useState([]);
    const [rates, setRates] = useState([]);
    const [search, setSearch] = useState('');
    const { getUsers, getNews, getAllJkh, getRates, getUserJkh } = useMainService();

    useEffect(() => {
        if (role.filter(item => item.name === "ROLE_ADMIN").length !== 0) {
            handleUserLoad();
            handleJkhLoad();
            handleNewsLoad();
            handleRateLoad();
        } else if (role.filter(item => item.name === "ROLE_KSK").length !== 0) {
            handleUserLoad();
            handleNewsLoad();
            handleRateLoad();
            handleMyJkhLoad();
        }

    }, [role]);

    const handleMyJkhLoad = () => {
        getUserJkh(userId)
            .then(data => {
                setMyJkh(data);
            })
            .catch(err => console.log(err));
    }

    const handleRateLoad = () => {
        getRates()
            .then(data => {
                setRates(data);
            })
            .catch(err => console.log(err));
    }

    const handleUserLoad = () => {
        getUsers()
            .then(data => {
                setUsers(data.map(item => ({ ...item, show: true })));
                console.log("data", data);
            })
            .catch(err => console.log(err));
    }

    const handleJkhLoad = () => {
        getAllJkh()
            .then(data => {
                setAllJkh(data);
                console.log("jkh", data);
            })
            .catch(err => console.log(err));
    }

    const handleSearch = (searchTerm) => {
        const results = users.map(item =>
            item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ? { ...item, show: true } : { ...item, show: false }
        );

        setUsers(results);
    };

    const handleNewsLoad = () => {
        getNews()
            .then(data => {
                setNews(data);
            })
            .catch(err => console.log(err));
    }

    const newsInfo = useMemo(() => {
        return news.map(item => (
            <NewsItem
                key={item.id}
                admin={true}
                onDelete={() => {
                    handleNewsLoad()
                }}
                id={item.id}
                title={item.title}
                text={item.text}
                date={item.date} />
        ))
    }, [news])



    function sortUsersByFullName() {
        let array = [...users].sort((a, b) => {
            if (a.fullName < b.fullName) {
                return -1;
            }
            if (a.fullName > b.fullName) {
                return 1;
            }
            return 0;
        });

        setUsers(array);
    }

    function sortUsersByFullNameReverse() {
        let array = [...users].sort((a, b) => {
            if (a.fullName > b.fullName) {
                return -1;
            }
            if (a.fullName < b.fullName) {
                return 1;
            }
            return 0;
        })

        setUsers(array);
    }

    const usersInfo = useMemo(() => (
        users.map(item => (
            item.show ? <UsersItem
                key={item.id}
                banned={item.banned}
                home={item.home}
                onDelete={
                    handleUserLoad
                }
                fullName={item.fullName}
                username={item.username}
                id={item.id} /> : null
        ))
    ), [users]);

    const jkhInfo = useMemo(() => (
        allJkh.map(item => (
            <JkhItem
                key={item.id}
                name={item.name}
                id={item.id} />
        ))
    ), [allJkh]);

    const rateInfo = useMemo(() => (
        rates.map(item => (
            <RateItem
                key={item.id}
                name={item.name}
                number={item.number}
                price={item.price}
                id={item.id}
                onDelete={handleRateLoad} />
        ))
    ), [rates]);

    return (
        <div className="orders">
            <div className="orders__header">
                <div
                    className={"orders__top" + (active === 0 ? ' active' : '')}
                    onClick={() => { setActive(0) }}>
                    Новости
                </div>
                <div
                    className={"orders__top" + (active === 2 ? ' active' : '')}
                    onClick={() => { setActive(2) }}>
                    Пользователи
                </div>
                <div
                    className={"orders__top" + (active === 3 ? ' active' : '')}
                    onClick={() => { setActive(3) }}>
                    Жкх
                </div>
                <div
                    className={"orders__top" + (active === 4 ? ' active' : '')}
                    onClick={() => { setActive(4) }}>
                    Тарифы
                </div>
            </div>

            <div className="orders__body">
                <div className={"orders__container" + (active === 0 ? ' active' : '')}>
                    <div className="orders__filter">
                        <Link to={"/news"} className="orders__button">
                            <i className="fa-solid fa-file-circle-plus"></i>
                        </Link>
                    </div>
                    <div className="news">
                        {newsInfo}
                    </div>
                </div>
                <div className={"orders__container" + (active === 2 ? ' active' : '')}>
                    <div className="orders__filter">
                        <div className="orders__input">
                            <input
                                autoComplete='off'
                                className={search !== '' ? 'focus' : ''}
                                type="text"
                                id='search'
                                value={search}
                                onChange={e => {
                                    handleSearch(e.target.value)
                                    setSearch(e.target.value)
                                }} />
                            <label htmlFor="search">
                                Поиск
                            </label>
                        </div>
                        <Link to={"/user/create"} className="orders__button">
                            <i className="fa-solid fa-user-plus"></i>
                        </Link>
                        <div className="orders__button" onClick={() => { sortUsersByFullName() }}>
                            <i className="fa-solid fa-arrow-up-a-z"></i>
                        </div>
                        <div className="orders__button" onClick={() => { sortUsersByFullNameReverse() }}>
                            <i className="fa-solid fa-arrow-down-z-a"></i>
                        </div>
                    </div>
                    <div className="users">
                        {usersInfo}
                    </div>
                </div>
                <div className={"orders__container" + (active === 3 ? ' active' : '')}>
                    <div className="orders__filter">
                        <Link to={"/jkh"} className="orders__button">
                            <i className="fa-solid fa-building-circle-arrow-right"></i>
                        </Link>
                    </div>
                    <div className="jkh">
                        {jkhInfo}
                    </div>
                </div>
                <div className={"orders__container" + (active === 4 ? ' active' : '')}>
                    <div className="orders__filter">
                        <Link to={"/rate/create"} className="orders__button">
                            <i className="fa-solid fa-circle-plus"></i>
                        </Link>
                    </div>
                    <div className="rates">
                        {rateInfo}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;