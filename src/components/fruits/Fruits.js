import React from 'react';
import fruits_pic from '../images/fruits_pic.jpg';
import SingleFruit from './SingleFruit';
import './fruits.css'

class Fruits extends React.Component
{
    state = {allfruits:[],show_fruit:false,active_fruit:''}

    componentDidMount()
    {
        fetch("http://localhost:3000/products")
        .then(resp => resp.json())
        .then(data => this.setState(this.state.allfruits=data.fruits))
    }

    showFruit = (fruit) => 
    {
        this.setState(prevState => ({...prevState,show_fruit:!prevState.show_fruit,active_fruit:fruit}))
    }

    render()
    {
        return(
            <div>
                {this.state.show_fruit ? 
                <div>
                <SingleFruit fruit={this.state.active_fruit} back={this.showFruit}/>
                </div>
                : 
                <div>
                <img src={fruits_pic} alt="Fruits" />
                <div className="Tilesgrid">
                {this.state.allfruits.map(fruit => {
                    return <div className="Tile" onClick={()=>this.showFruit(fruit)}>
                        <img src={fruit.img} alt={fruit.name} /><br/>
                        <h4>{fruit.name}</h4></div>
                })}
            </div></div>}
            </div>
        )
    }
}
export default Fruits