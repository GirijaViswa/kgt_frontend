import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Fruit from './components/fruits/Fruits'; 
import Vegetable from './components/vegetables/Vegetable'
import Home from './components/home/Home'
// import center_pic from './images/center_pic.jpg';
import './App.css';

function App() {
  return (
    <div><Router>
      <div className="App">
      <Link to="/" className="Links">Logo</Link> 
      <Link to="/fruits" className="Links">Fruits</Link>
      <Link to="/vegetables" className="Links">Vegetables</Link>
      <div className="Spacer"/>
      <Link to="/login" className="Links">Login</Link>
      <Link to="/signup" className="Links">SignUp</Link>
      </div>
     
      <Switch>
        <Route path="/fruits"><Fruit/></Route>
        <Route path="/vegetables"><Vegetable/></Route>
        <Route path="/"><Home/></Route>
      </Switch>
      
    </Router></div>
  );
}

export default App;
