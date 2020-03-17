import React from 'react';
import './SingleFruit.css';
//List all the Recipe videos available for this fruit
const SingleFruitTaste = (props) => (
      <div className="Video_Lister"><br/><br/>
        <ul>
        <li><iframe width="400" height="300" src={props.fruit_recipe[0].url} frameborder="0"></iframe></li>
        <li><iframe width="400" height="300" src={props.fruit_recipe[1].url} frameborder="0"></iframe></li>
        <li><iframe width="400" height="300" src={props.fruit_recipe[2].url} frameborder="0"></iframe></li>
        </ul>
    </div>
);

export default SingleFruitTaste