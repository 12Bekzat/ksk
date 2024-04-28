import React, { useEffect, useState } from 'react';
import { getLocalStorageWithExpiry } from '../services/getLocalStorageWithExpiry';
import { useNavigate } from 'react-router-dom';

export const AuthContext = React.createContext({ isAuth: false, role: [] });

const AuthProvider = ({ children }) => {
    const [isAuth, setAuth] = useState(false);
    const [role, setRole] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        if (getLocalStorageWithExpiry("token")) {setAuth(true);}
        else {
            nav("/login");
        }
    }, [])

    useEffect(() => {
        if (!isAuth && !getLocalStorageWithExpiry("token")) {
            nav("/login");
        }
    }, [isAuth])

    return (
        <AuthContext.Provider value={{ isAuth, setAuth, role, setRole }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;