import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import useMainService from '../../services/MainService';
import { PopupContext } from '../../providers/PopupProvider';

const JkhItem = ({ name, id, onDelete }) => {
    const { setData } = useContext(PopupContext);
    const { } = useMainService();

    return (
        <div className="users__item">
            <Link to={"/jkh/" + id} className="users__content">
                <div className={"users__title"}>{name}</div>
            </Link>
            <div className="users__buttons">
                <Link to={"/jkh?id=" + id}><i className="fas fa-pen"></i></Link>
                <button className='del'>
                    <i className="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>
    );
};

export default JkhItem;