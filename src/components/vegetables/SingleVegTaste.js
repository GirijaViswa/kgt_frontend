import React from 'react';
import './SingleVeg.css';
import {connect} from 'react-redux';

//List all the recipe videos available for this vegetable

const addToCollection = (video,props) => {
    if (localStorage.getItem('token') || props.user.loggedIn)
    {
    const token = localStorage.getItem("token")
    var data = {video_id:video.id,user_id:localStorage.getItem('user_id')}
    var headers = {"Content-Type":"application/json","Accept":"application/json",Authorization:token}
    fetch(`http://localhost:3000/users/${localStorage.getItem('user_id')}/mycollections`,
    {method:"POST",headers:headers ,body:JSON.stringify(data)})
    .then(resp => resp.json())
    .then(data => {
        if (data.status==="ok")
        {
           alert(data.msg)
           props.dispatch({type:"ADD_VIDEOS",video:data.mycollection});
        }})
    .catch(error => {console.error('Error', error);})
    }
    else
    {
        alert("Kindly Login/Signup to save this video to your collection.");
        props.history.push("/login");
    }
}

const SingleVegTaste = (props) => (
    <div className="Video_Lister"><br/><br/>
       { props.veg.single_veg.recipe_videos.map(video => {
           return  <div className="Video_Item">
                <iframe width="400" height="300" src={video.url} frameborder="0"></iframe><br/><br/>
                <div class="heart" id={video.id} onClick={()=>addToCollection(video,props)}></div><br/><br/>
                </div>
        })}
        
    </div>
);

const mapStatetoProps = (state) =>(
    {veg:state.vegs,user:state.user}
);

export default connect(mapStatetoProps)(SingleVegTaste);