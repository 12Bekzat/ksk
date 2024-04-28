import React, { useContext, useEffect } from 'react';
import { LogoLightImg } from '../../images/system';
import { Link, NavLink } from 'react-router-dom';
import useMainService from '../../services/MainService';
import { AuthContext } from '../../providers/AuthProvider';

const Header = () => {
    const { getRoles } = useMainService();
    const { isAuth, role, setRole } = useContext(AuthContext);

    useEffect(() => {
        if (isAuth) {
            getRoles()
                .then(data => {
                    setRole(data);
                })
                .catch(err => console.log(err));
        }
    }, [isAuth])

    return (
        <div className="header">
            <div className="header__row">
                <Link to={"/"} className="header__logo">
                    <img src={LogoLightImg} alt="" />
                </Link>

                <div className="header__nav">
                    {role.includes("ROLE_ADMIN", "ROLE_SECONDARY") ? <><NavLink to={"/"}
                        className={({ isActive }) => "header__link" + (isActive ? " active" : "")}>
                        Главная
                    </NavLink>
                        <NavLink to={"/admin"}
                            className={({ isActive }) => "header__link" + (isActive ? " active" : "")}>
                            Админ панель
                        </NavLink>
                        <NavLink to={"/manage"}
                            className={({ isActive }) => "header__link" + (isActive ? " active" : "")}>
                            Управление счета
                        </NavLink></> : null}
                </div>

                <Link to={"/profile"} className="header__button">
                    Профиль
                </Link>
            </div>
        </div>
    );
};

export default Header;