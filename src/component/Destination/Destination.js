import React from 'react';
import './Destination.css';

const Destination = () => {
    return (
        <div className='destination'>
            <div className='search'>
                <input className='form-control' type="search" placeholder="Search your destination" id=""/>
            </div>
            <img src="https://media-eng.dhakatribune.com/uploads/2019/03/web-google-map-1553422275842.JPG" alt=""/>
        </div>
    );
};

export default Destination;