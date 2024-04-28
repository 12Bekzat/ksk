import React from 'react';

const HeaderNav = () => {
    return (
        <div className="header_nav" id="home">
            <div className="container">
                <nav className="navbar navbar-default chn-gd">

                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                            data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <a href="index.html">
                                    <span className="glyphicon glyphicon-home " aria-hidden="true"></span>
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="services.html">
                                    <span className="glyphicon glyphicon-cog " aria-hidden="true"></span>
                                    Services
                                </a>
                            </li>
                            <li>
                                <a href="about.html">
                                    <span className="glyphicon glyphicon-user " aria-hidden="true"></span>
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="projects.html">
                                    <span className="glyphicon glyphicon-thumbs-up " aria-hidden="true"></span>
                                    Projects
                                </a>
                            </li>
                            <li>
                                <a href="shortcodes.html">
                                    <span className="glyphicon glyphicon-picture " aria-hidden="true"></span>
                                    Short Codes
                                </a>
                            </li>
                            <li className="active las">
                                <a href="login.html">
                                    <span className="glyphicon glyphicon-envelope" aria-hidden="true"></span>
                                    Login
                                </a>
                            </li>
                            <div className="clearfix"></div>
                        </ul>
                        <div className="clearfix"></div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default HeaderNav;