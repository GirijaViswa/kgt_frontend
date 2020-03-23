import React from 'react';
import vegetables_pic from '../images/vegetables_pic.jpg';
import SingleVeg from './SingleVeg';
import './vegetable.css';

class Vegetable extends React.Component
{
    state = {allvegs:[],show_veg:false,active_veg:''}

    componentDidMount()
    {
        fetch("http://localhost:3000/products")
        .then(resp => resp.json())
        .then(data => this.setState(this.state.allvegs=data.vegetables))
    }

    showVeg = (veg) => 
    {
        this.setState(prevState => ({...prevState,show_veg:!prevState.show_veg,active_veg:veg}))
    }

    render()
    {
        return(
            <div>
               {this.state.show_veg ? 
                <div>
                <SingleVeg veg={this.state.active_veg} back={this.showVeg}/>
                </div>
                : 
                <div>
                <img src={vegetables_pic} alt="Vegetables" />
                <div className="Tilesgrid">
                {this.state.allvegs.map(veg => {
                    return <div className="Tile" onClick={()=>this.showVeg(veg)}>
                        <img src={veg.img} alt={veg.name} /><br/>
                        <h4>{veg.name}</h4></div>
                })}
            </div></div>}
            </div>
        )
    }
}

export default Vegetable