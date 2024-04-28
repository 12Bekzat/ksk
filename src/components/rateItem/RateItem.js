import React from 'react';
import { Link } from 'react-router-dom';
import useMainService from '../../services/MainService';

const RateItem = ({ name, number, price, id, onDelete }) => {
    const { removeRate } = useMainService();

    const remove = () => {
        removeRate(id)
            .then(data => {
                onDelete();
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='rates__item'>
            <div className="rates__content">
                <div className="rates__title">{`${name}(${number})`}</div>
                <div className="rates__text">{parseFloat(price).toFixed(2)} ₸</div>
            </div>
            <div className="rates__buttons">
                <Link to={"/rate/create?id=" + id}>
                    <i className="fa-solid fa-pen"></i>
                </Link>
                <button className='del' onClick={remove}>
                    <i className="fa-solid fa-trash-can"></i>
                </button>
            </div>
        </div>
    );
};

export default RateItem;