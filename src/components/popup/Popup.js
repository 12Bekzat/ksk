import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

const Popup = (props) => {
    const element = useMemo(() => (document.createElement("span")), []);
    const rootElement = document.getElementById("modal");
    const { title, text, onClose } = props;

    useEffect(() => {
        rootElement.appendChild(element);

        return () => {
            rootElement.removeChild(element);
        }
    }, []);

    return createPortal(
        <div className={"popup"}>
            <div className="popup__title">{title}</div>
            <div className="popup__text">{text}</div>
            <div className="popup__icon" onClick={onClose}>
                <i className="fa-solid fa-xmark"></i>
            </div>
        </div>, element);
};

export default Popup;