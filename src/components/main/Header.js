import React from 'react';
import {NavLink} from "react-router-dom";

function Header () {
    return (
        <div className="header">
            <div className={'text'}>
                MINI Games
            </div>
            <div className={'link'}>
                <NavLink to={'/'}> Домой </NavLink>
            </div>
        </div>
    );
}

export default Header;