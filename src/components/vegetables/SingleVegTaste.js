import React from 'react';
import './SingleVeg.css';
//List all the Recipe videos available for this veg
const SingleVegTaste = (props) => (
    <div className="Video_Lister"><br/><br/>
    { props.veg_recipe.map(video => {
        return  <div className="Video_Item">
             <iframe width="400" height="300" src={video.url} frameborder="0"></iframe><br/><br/>
             <div class="heart" id={video.id}></div><br/><br/>
             </div>
     })}
     
 </div>
);

export default SingleVegTaste