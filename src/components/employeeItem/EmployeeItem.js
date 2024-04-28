import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import useMainService from '../../services/MainService';
import { PopupContext } from '../../providers/PopupProvider';

const EmployeeItem = ({ fullName, username, jkhId, id, onDelete }) => {
    const { removeEmployeeJkh } = useMainService();
    const { setData } = useContext(PopupContext);

    const remove = () => {
        removeEmployeeJkh(jkhId, id)
            .then(data => {
                onDelete();
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="users__item">
            <div className="users__content">
                <div className={"users__title"}>{fullName}</div>
                <div className="users__text">{username}</div>
            </div>
            <div className="users__buttons">
                <button className='del'
                    onClick={remove}>
                    <i className="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>
    );
};

export default EmployeeItem;