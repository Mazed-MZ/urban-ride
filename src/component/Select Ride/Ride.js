import React from 'react';
import { useHistory } from 'react-router';
import './Ride.css';

const Ride = () => {

    const history = useHistory();

    const handleRide = () =>{
        history.push('/map')
    }
    return (
        <div className='ride'>
            <div id='car' className='ride-div'>
                <img src="https://img.freepik.com/free-psd/silver-sedan-car_53876-84522.jpg?size=626ext=jpg" alt=""/>
                <button onClick={handleRide} className='btn btn-dark'>Car</button>
            </div>
            <div id='bus' className='ride-div'>
                <img src="https://www.clipartkey.com/mpngs/m/314-3140955_clipart-bus-bus-transportation-transparent-background-bus-icon.png" alt=""/>
                <button onClick={handleRide} className='btn btn-dark'>Bus</button>
            </div>
            <div id='train' className='ride-div'>
                <img src="https://www.seekpng.com/png/small/2-22978_modern-train-png-clip-art-modern-high-speed.png" alt=""/>
                <button onClick={handleRide} className='btn btn-dark'>Train</button>
            </div>
        </div>
    );
};

export default Ride;