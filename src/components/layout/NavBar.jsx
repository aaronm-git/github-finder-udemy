import React from "react";

const NavBar = props => {
    return (
        <nav className='navbar bg-primary'>
            <h1>
                <i className={props.icon} /> {props.title}
            </h1>
        </nav>
    );
};

export default NavBar;
