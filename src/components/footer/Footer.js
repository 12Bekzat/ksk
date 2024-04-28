import React from 'react';
import { LogoLightImg } from '../../images/system';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__row">
                <div className="footer__logo">
                    <img src={LogoLightImg} alt="" />
                </div>
                <div className="footer__info">
                    <div className="footer__link">info@urban-pluse.kz</div>
                    <div className="footer__link">+7 777 555 55 55</div>
                </div>
                <div className="footer__social">
                    <div className="footer__icon">
                        <i className="fa-brands fa-instagram"></i>
                    </div>
                    <div className="footer__icon">
                        <i className="fa-brands fa-telegram"></i>
                    </div>
                    <div className="footer__icon">
                        <i className="fa-brands fa-whatsapp"></i>
                    </div>
                </div>
            </div>
            <div className="footer__row">
                <div className="footer__copy">
                    <span>&copy;</span> Urban Pluse 2024. Все права защищены.
                </div>
            </div>
        </div>
    );
};

export default Footer;