import React from "react";
import { Link } from "react-router-dom";

const NavBar = props => {
    return (
        <nav className='navbar bg-primary'>
            <h1>
                <i className={props.icon} /> {props.title}
            </h1>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
