import React from 'react';
import vegetables_pic from '../images/vegetables_pic.jpg';
import './vegetable.css';

class Vegetable extends React.Component
{
    render()
    {
        return(
            <div>
                <img src={vegetables_pic} alt="Fruits picture" />
            </div>
        )
    }
}

export default Vegetable