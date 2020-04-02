import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Fruit from "./components/Fruits/Fruits";
import Vegetable from "./components/Vegetables/Vegetable";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import MyProfile from "./components/MyProfile/MyProfile";
import MyCollection from "./components/MyCollection/MyCollection";
import garden from "./components/images/g2.jpg";
import "./App.css";
import { ReactComponent as Logo } from "./components/images/Logo.svg";
import { connect } from "react-redux";

const handleLogout = props => {
  localStorage.clear();
  console.log("props", props);
  props.dispatch({ type: "LOGOUT" });

  // console.log('props',props.value)
  // console.log('props',props.value.history)
  // props.value.history.push('/');
};

function App(props) {
  return (
    <div>
      <div className="PageContent">
      <Router>
        <div className="App">
          <Link to="/" className="Links"><Logo /></Link>
          <Link to="/fruits" className="Links">Fruits</Link>
          <Link to="/vegetables" className="Links">Vegetables</Link>
          <div className="Spacer" />
          {localStorage.getItem("token") || props.user.loggenIn ? (
            <div>
              <Link to="/mycollection" className="Links">My Collections</Link>
              <Link to="/myprofile" className="Links"> My Profile</Link>
              {/* <Link to="/" className="Links" ><div  onClick={()=>handleLogout(props)}>LogOut</div></Link></div> */}
              <Link to="/" className="Links" onClick={() => handleLogout(props)} >LogOut</Link>
            </div>
          ) : (
            <div>
              <Link to="/login" className="Links">Login</Link>
              <Link to="/signup" className="Links">SignUp</Link>
            </div>
          )}

          {/* <Link to="/login" className="Links">Login</Link>
      <Link to="/signup" className="Links">SignUp</Link> */}
        </div>

        <Switch>
          <Route exact path="/fruits" component={Fruit} />
          <Route exact path="/vegetables" component={Vegetable} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/mycollection" component={MyCollection} />
          <Route exact path="/myprofile" component={MyProfile} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
      </div>
      {/* <div> */}
      {/* <div className="Footer">
      <footer >
        <center>
          Nothing great is created suddenly, any more than a bunch of grapes or
          a fig. If you tell me that you desire a fig. I answer you that there
          must be time. Let it first blossom, then bear fruit, then ripen.
        </center></footer>
      </div> */}
    </div>
  );
}

const mapStatetoProps = state => {
  return { user: state.user };
};

export default connect(mapStatetoProps)(App);
