import React from 'react';
import './Header.css';
const Header = () => {
    return (
        <div className='header'>
            <h1>CITY RIDE</h1>
            <nav>
                <a href="/home">Home</a>
                <a href="/map">Destination</a>
                <a href="/blog">Blog</a>
                <a href="/contact">Contact</a>
                <a href="/login"><button className='btn btn-primary'>Log In</button></a>
            </nav>
        </div>
    );
};

export default Header;