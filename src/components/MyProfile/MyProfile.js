import React from 'react';
import './MyProfile.css';

class MyProfile extends React.Component
{
    state = {myprofile:[]}
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
            // .then(data => console.log(data))
            .then(data => this.setState({myprofile:data}))
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
                {this.state.myprofile.name}
                {this.state.myprofile.email}
            </div>
        )
    }
}

export default MyProfile