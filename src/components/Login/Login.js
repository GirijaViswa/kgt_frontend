import React from 'react'
import './Login.css';

const handleSubmit = (e,props) => {
    e.preventDefault();
    const token = localStorage.getItem("token")
    var data = {email:e.target.Email.value,password:e.target.Password.value}
    var headers = {"Content-Type":"application/json","Accept":"application/json",Authorization:token}

    fetch("http://localhost:3000/auth",{method:"POST",headers:headers ,body:JSON.stringify(data)})
    .then(resp => resp.json())
    .then(user => {
        if (user.id)
        {
            localStorage.setItem('token',user.token)
            localStorage.setItem('user_id',user.id)
            console.log(props)
            props.handleLogin()
            // props.history.push('/')
        }
        console.log(user)}) 
        console.log(props)

    if (localStorage.getItem('token'))
    {
        debugger
        // props.handleLogin
    }
}

const Login = (props) => (
    <div className="LoginForm">
        
        <form onSubmit={(e)=>handleSubmit(e,props)}>
            <h2>Login</h2>
            <input type="text" name="Email" placeholder="Email" /><br/><br/>
            <input type="password" name="Password" placeholder="Password"/><br/><br/>
            <input type="submit" value="Login" className="LoginSubmit"/><br/>
            <h4><a onClick="">Register as New User</a></h4>
            <hr></hr>
            <h4><a onClick="">Continue as Guest</a></h4>
        </form>
    </div>
);

export default Login