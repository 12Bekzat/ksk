import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import useMainService from '../../services/MainService';
import { PopupContext } from '../../providers/PopupProvider';

const UsersItem = ({ fullName, username, id, banned, onDelete, home }) => {
    const [ban, setBan] = useState(banned);
    const { setBanUser, setUnbanUser, removeUser } = useMainService();
    const { setData } = useContext(PopupContext);

    const actionUser = () => {
        if (ban) {
            setUnbanUser(id)
                .then(data => {
                    setBan(false);
                })
                .catch(err => {
                    setData({ show: true, text: 'Разблокировать пользователя не получилось!', title: 'Ошибка' });
                })
        } else {
            setBanUser(id)
                .then(data => {
                    setBan(true);
                })
                .catch(err => {
                    setData({ show: true, text: 'Заблокировать пользователя не получилось!', title: 'Ошибка' });
                })
        }
    }

    const remove = () => {
        removeUser(id)
            .then(data => {
                onDelete();
            })
            .catch(err => {
                console.log(err);
                setData({ show: true, text: 'Не удалось удалить пользователя!', title: 'Ошибка' });
            })
    }

    return (
        <div className="users__item">
            <div className="users__content">
                <div className={"users__title" + (ban ? ' ban' : '')}>{fullName}</div>
                <div className="users__text">{username}</div>
            </div>
            <div className="users__buttons">
                {!home ? <Link to={"/house/create?id=" + id + "&jkhId=" + id}>
                    <i className="fa-solid fa-house-user"></i>
                </Link> : null}
                <button className='dec'
                    onClick={actionUser}>
                    {ban ? <i className="fa-solid fa-circle-check"></i> : <i className="fas fa-ban"></i>}
                </button>
                <Link to={"/user/edit/" + id}><i className="fas fa-pen"></i></Link>
                <button className='del'
                    onClick={remove}>
                    <i className="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>
    );
};

export default UsersItem;