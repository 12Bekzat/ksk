import React, { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

const Loader = () => {
    const element = useMemo(() => (document.createElement("span")), []);
    const rootElement = document.getElementById("modal");

    useEffect(() => {
        rootElement.appendChild(element);

        return () => {
            rootElement.removeChild(element);
        }
    }, []);

    return createPortal(
        <div className="loader">
            <div className="lds-facebook">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>, element);
};

export default Loader;