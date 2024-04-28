import React, { useEffect, useMemo, useState } from 'react';
import Popup from '../components/popup/Popup';

export const PopupContext = React.createContext({ data: { show: false, text: '', title: '' } });

export const PopupProvider = ({ children }) => {
    const [data, setData] = useState({ show: false, text: '', title: '' });

    const onClose = () => {
        setData(({ text, title }) => ({ show: false, text, title }));
    }

    const popup = useMemo(() => {
        return data.show ? <Popup title={data.title} text={data.text} onClose={onClose} /> : null;
    }, [data]);

    return (
        <PopupContext.Provider value={{ data, setData }} >
            {popup}
            {children}
        </PopupContext.Provider>
    )
}
