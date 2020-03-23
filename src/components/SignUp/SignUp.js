import React from 'react'
import './SignUp.css';

const handleSubmit = (e,props) => {
    e.preventDefault();
    console.log("Inside the handle function")
    var data = {name:e.target.Username.value,email:e.target.Email.value,password:e.target.Password.value}
    fetch("http://localhost:3000/new_user",{method:"POST",headers: {"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(data)})
    .then(resp => resp.json())
    .then(user => { 
        localStorage.setItem('token',user.token)
        localStorage.setItem('user_id',user.id)
        // props.history.push('/')
    })
    .catch(error => alert(error))
    console.log("fetch complete")
}


const SignUp = (props) => (
    <div className="SignUpForm">
        
        <form onSubmit={(e)=>handleSubmit(e,props)}>
            <h2>Create Account</h2>
            <input type="text" name="Username" placeholder="Username" /><br/><br/>
            <input type="text" name="Email" placeholder="Email" /><br/><br/>
            <input type="password" name="Password" placeholder="Password"/><br/><br/>
            <input type="submit" value="Go" className="SignupSubmit"/><br/>
            <h4><a onClick="">Already member</a></h4>
            <hr></hr>
            <h4><a onClick="">Continue as Guest</a></h4>
        </form>
    </div>
);

export default SignUp