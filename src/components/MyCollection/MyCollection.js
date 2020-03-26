import React from 'react';
import './MyCollection.css'
import {connect} from 'react-redux';

class MyCollection extends React.Component
{
    // state = {myVideos:[]}
    componentWillMount()
    {
        const token = localStorage.getItem('token')
        if (token)
        {
            var user_id = localStorage.getItem('user_id')
            var headers = { 'Content-Type': 'application/json',Accept: 'application/json',Authorization: token}
            fetch(`http://localhost:3000/users/${user_id}/mycollections`,{headers:headers})
            .then(resp => resp.json())
            // .then(data => console.log(data))
            // .then(data => this.setState({myVideos:data.myvideos}))

            .then(data => {
                // debugger
                this.props.dispatch({type:"GET_VIDEOS",myvideos:data.myvideos})
            } )
        }
        else
        {
            this.props.history.push('/login');
        }
    }

    handleDelete = (video) => {
        if (localStorage.getItem('token') || this.props.user.loggedIn)
        {
        const token = localStorage.getItem("token")
        var data = {video_id:video.id,user_id:localStorage.getItem('user_id')}
        var headers = {"Content-Type":"application/json","Accept":"application/json",Authorization:token}
        fetch(`http://localhost:3000/users/${localStorage.getItem('user_id')}/mycollections/${video.id}`,
        {method:'DELETE',headers:headers ,body:JSON.stringify(data)})
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            // this.props.dispatch({type:"GET_VIDEOS",myvideos:data.old_user_collection})
            this.props.dispatch({type:"REMOVE_VIDEOS",videoId:video.id})
            })
        .catch(error => {console.error('Error', error);})
        
        }
        else
        {
            this.props.history.push('/login');
        }
        
    }

    addToTry = (video) => {
        if (localStorage.getItem('token') || this.props.user.loggedIn)
        {
        const token = localStorage.getItem("token")
        var data = {video_id:video.id,user_id:localStorage.getItem('user_id')}
        var headers = {"Content-Type":"application/json","Accept":"application/json",Authorization:token}
        fetch(`http://localhost:3000/users/${localStorage.getItem('user_id')}/myworks/new`,
        {method:'POST',headers:headers ,body:JSON.stringify(data)})
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            alert(data.msg,"Work List can been seen in My Profile")
            })
        .catch(error => {console.error('Error', error);})
        
        }
        else
        {
            this.props.history.push('/login');
        }
        
    }

    render()
    {
        return(
            <div>
                {console.log('Starting Render',this.props.user.myvideos) }
                Your collection 
                {this.props.user.myvideos ? 
                // {this.state.myVideos ? 
                <div> <ul>
                    {/* <iframe width="400" height="300" src={this.state.myVideos[0]} frameborder="0"></iframe> */}
                    {/* {this.state.myVideos} */}

                {this.props.user.myvideos.map(video => {
                        console.log('video',video)
                    return <div>{video.name} <br/><br/>
                    <iframe width="400" height="300" src={video.url} alt={video.name} frameborder="0"></iframe><br/><br/>
                    <button onClick={()=>this.addToTry(video)}>Try this! </button><br/><br/>
                    <button onClick={()=>this.handleDelete(video)}>Remove from my collection</button><br/><br/>
                </div>
                }
                
                                
                )}</ul></div>
                : null} 
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return {user:state.user}
};

export default connect(mapStatetoProps)(MyCollection);