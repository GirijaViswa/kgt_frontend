import React from 'react';
import './SingleFruit.css';
//List all the gardening videos available for this fruit
const SingleFruitGrow = (props) => (
    <div className="Video_Lister"><br/><br/>
        <ul>
        <li><iframe width="400" height="300" src={props.fruit_garden[0].url} frameborder="0"></iframe></li>
        <li><iframe width="400" height="300" src={props.fruit_garden[1].url} frameborder="0"></iframe></li>
        <li><iframe width="400" height="300" src={props.fruit_garden[2].url} frameborder="0"></iframe></li>
        </ul>
    </div>
);

export default SingleFruitGrow