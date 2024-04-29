import React, { useEffect, useMemo, useState } from 'react';
import Popup from '../components/popup/Popup';
import Loader from '../components/loader/Loader';

export const LoaderContext = React.createContext({ show: false, time: 3000 });

export const LoaderProvider = ({ children }) => {
    const [show, setShow] = useState(false);
    const [time, setTime] = useState(3000);

    useEffect(() => {
        if (show) {
            const timeOut = setTimeout(() => {
                setShow(false);
                clearTimeout(timeOut);
            }, time)
        }
    }, [show])

    const popup = useMemo(() => {
        return show ? <Loader /> : null;
    }, [show]);

    return (
        <LoaderContext.Provider value={{ show, setShow, time, setTime }} >
            {popup}
            {children}
        </LoaderContext.Provider>
    )
}
