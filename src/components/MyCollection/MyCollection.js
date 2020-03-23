import React from 'react';
import './MyCollection.css'

class MyCollection extends React.Component
{
    state = {myVideos:[]}
    componentDidMount()
    {
        const token = localStorage.getItem('token')
        if (token)
        {
            var user_id = localStorage.getItem('user_id')
            var headers = { 'Content-Type': 'application/json',Accept: 'application/json',Authorization: token}
            fetch(`http://localhost:3000/users/${user_id}/mycollections`,{headers:headers})
            .then(resp => resp.json())
            // .then(data => console.log(data))
            .then(data => this.setState({myVideos:data.myvideos}))
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
                Your collection 
                {this.state.myVideos ? 
                <div> My collection<ul>
                    {/* <iframe width="400" height="300" src={this.state.myVideos[0]} frameborder="0"></iframe> */}
                    {/* {this.state.myVideos} */}
                {this.state.myVideos.map(video => (
                    <iframe width="400" height="300" src={video.url} frameborder="0"></iframe>
                )
                    // return 
                    // <div>
                    // <iframe width="400" height="300" src={video.url} frameborder="0"></iframe>
                    // </div>
                                
                )}</ul></div>
                : null}
            </div>
        )
    }
}

export default MyCollection