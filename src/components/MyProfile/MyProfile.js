import React from 'react';
import './MyProfile.css';
import {connect} from 'react-redux';

class MyProfile extends React.Component
{

    componentDidMount()
    {
        const token = localStorage.getItem('token')
        if (token)
        {
            var user_id = localStorage.getItem('user_id')
            var headers = { 'Content-Type': 'application/json',Accept: 'application/json',Authorization: token}
            console.log(`http://localhost:3000/users/${user_id}`)
            fetch(`http://localhost:3000/users/${user_id}`,{headers:headers})
            .then(resp => resp.json())
            .then(data => {
                console.log('data',data)
                this.props.dispatch({type:"SET_PROFILE",myprofile:data.profile,user_works:data.user_works,user_posts:data.user_posts})
            })
        }
        else
        {
            this.props.history.push('/login');
        }
    }

    handleSubmit = (e,work) => {
        e.preventDefault();
        if (localStorage.getItem('token') || this.props.user.loggedIn)
        {
        const token = localStorage.getItem("token")
        var data = {information:e.target.information.value,image:e.target.image.value,video_id:work.id}
        var headers = {"Content-Type":"application/json","Accept":"application/json",Authorization:token}
        // debugger
        fetch(`http://localhost:3000/users/${localStorage.getItem('user_id')}/posts/new`,
        {method:'POST',headers:headers ,body:JSON.stringify(data)})
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            alert(data.msg)
            this.props.dispatch({type:"SET_PROFILE",myprofile:data.profile,user_works:data.user_works,user_posts:data.user_posts})
            })
        .catch(error => {console.error('Error', error);})
        
        }

    }

    handleLogout = () => {
        localStorage.clear();
        this.props.dispatch({type:"LOGOUT"});
        this.props.history.push('/');
    }

    render()
    {
        return(
            <div>
                {/* {this.state.myprofile.name}
                {this.state.myprofile.email} */}
                <button onClick={()=>this.handleLogout()}>Logout</button>
                
                <h3>User details</h3>

                <div className="UserDetails">
                    {((this.props.user.myprofile.name) && (this.props.user.myprofile.email)) ? 
                    <table className="TContents"><tbody>
                    <tr><td >Username </td> <td>{this.props.user.myprofile.name}</td></tr>
                    <tr><td >Email </td> <td>{this.props.user.myprofile.email}</td></tr> 
                    </tbody></table>
                    :null}
                    
                </div>

                <h3>User Works</h3>
                {this.props.user.user_works ? 
                <table className="TContents">
                {this.props.user.user_works.map(work => {
                 return <tbody><tr><td >Name of the video </td> <td>{work.name}</td></tr>
                    <tr><td >Video url </td> <td>{work.url}</td></tr>
                    <tr><td >Video type </td> <td>{work.video_type}</td></tr> 
                    <tr></tr>
                 <div>
                    <h3>Create new Post</h3>
                    <form onSubmit={(e)=>this.handleSubmit(e,work)}>
                        <input type="text" name="image" placeholder="Add any image"/><br/><br/>
                        <input type="textarea" name="information" placeholder="Comments "/><br/><br/>
                        <input type="submit" value="Create a post"/>
                    </form>
                </div>
                <hr/>
                <br/>
                <div className="Post">
                    <h3>User Posts</h3>
                    {this.props.user.user_posts ? 
                    <table className="TContents">
                        
                        {this.props.user.user_posts.map(post => {
                            // {post.user_work_id === work.id ? 
                                
                            return <tbody><tr><td >Comments </td> <td>{post.information}</td></tr>
                                <tr><td >Image url </td> <td><img src={post.image} style={{heigth:"50%",width:"50%"}}/></td></tr>
                                <tr></tr>
                                <tr></tr>
                                </tbody>
                            // : null}
                        
                        })}
                    </table>
                    : null}
                </div>
                <hr/>
                <hr/>
                 <tr></tr>
                 </tbody>
                })}
                </table>
                : null}
                
                
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return {user:state.user}
}

export default connect(mapStatetoProps)(MyProfile);