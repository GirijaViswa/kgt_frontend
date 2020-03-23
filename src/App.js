import React,{useState} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Fruit from './components/Fruits/Fruits'; 
import Vegetable from './components/Vegetables/Vegetable';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import MyProfile from './components/MyProfile/MyProfile';
import MyCollection from './components/MyCollection/MyCollection';
import garden from './components/images/g2.jpg';
import './App.css';

function App() {

  const {state,setState} = useState(false);

  console.log(state)
  console.log(setState)

  const handleLogin = () => ( 
    console.log(setState)
    // setState(!state)
  );

  return (
    <div><Router>
      <div className="App">
      <Link to="/" className="Links">Logo</Link> 
      <Link to="/fruits" className="Links">Fruits</Link>
      <Link to="/vegetables" className="Links">Vegetables</Link>
      <div className="Spacer"/>
      {localStorage.getItem('token') ? 
      <div>
        <Link to="/mycollection" className="Links">My Collections</Link>
        <Link to="/myprofile" className="Links">My Profile</Link></div>
      :
      <div>
        <Link to="/login" className="Links">Login</Link>
        <Link to="/signup" className="Links">SignUp</Link></div>
      }

      {/* <Link to="/login" className="Links">Login</Link>
      <Link to="/signup" className="Links">SignUp</Link> */}

      </div>
     
      <Switch>
        <Route exact path="/fruits" component={Fruit}/>
        <Route exact path="/vegetables" component={Vegetable} />
        <Route exact path="/login"><Login handleLogin={handleLogin} /></Route>
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/mycollection" component={MyCollection}/>
        <Route exact path="/myprofile" component={MyProfile}/>
        <Route exact path="/" component={Home}/>
      </Switch>
      </Router>
      <div className="Footer"><center>Nothing great is created suddenly, any more than a bunch of grapes or a fig. If you tell me that you desire a fig. I answer you that there must be time. Let it first blossom, then bear fruit, then ripen.
       </center></div>
    </div>
  );
}

export default App;
