import React from 'react';
import vegetables_pic from '../images/vegetables_pic.jpg';
import SingleVeg from './SingleVeg';
import './vegetable.css';
import { connect } from 'react-redux';

class Vegetable extends React.Component
{
    componentDidMount()
    {
        fetch("http://localhost:3000/products")
        .then(resp => resp.json())
        .then(data => this.props.dispatch({type:"ALL_VEGS",allvegs:data.vegetables}))
    }

    showVeg = (veg) => 
    {
        this.props.dispatch({type:"SHOW_VEG",showVeg:veg})
    }

    render()
    {
        return(
            <div>
               {this.props.vegs.show_veg ? 
                <div>
                <SingleVeg />
                </div>
                : 
                <div>
                <img src={vegetables_pic} alt="Vegetables" />
                <div className="Tilesgrid">
                {this.props.vegs.allvegs.map(veg => {
                    return <div className="Tile" onClick={()=>this.showVeg(veg)}>
                        <img src={veg.img} alt={veg.name} /><br/>
                        <h4>{veg.name}</h4></div>
                })}
            </div></div>}
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return {vegs:state.vegs}
}

export default connect(mapStatetoProps)(Vegetable);