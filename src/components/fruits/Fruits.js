import React from 'react';
import fruits_pic from '../images/fruits_pic.jpg';
import SingleFruit from './SingleFruit';
import './fruits.css'
import {connect} from 'react-redux';

class Fruits extends React.Component
{
    // state = {allfruits:[],show_fruit:false,active_fruit:''}

    componentDidMount()
    {
        fetch("http://localhost:3000/products")
        .then(resp => resp.json())
        .then(data => this.props.dispatch({type:"ALL_FRUITS",allfruits:data.fruits}))
            // .then(data => this.props.all_fruits(data.fruits))
            // console.log(this.props.fruits.allfruits)
        // .then(data => this.setState(this.props.fruits.allfruits=data.fruits))
    }

    showFruit = (fruit) => 
    // showFruit = (fruit) => (e) => 
    {
        // debugger
        // this.props.show_fruit(fruit)
        this.props.dispatch({type:"SHOW_FRUIT",showFruit:fruit})
        // this.setState(prevState => ({...prevState,show_fruit:!prevState.show_fruit,active_fruit:fruit}))
    }

    render()
    {
        return(
            <div>
                {this.props.fruits.show_fruit ? 
                <div>
                <SingleFruit />
                {/* <SingleFruit fruit={this.props.fruits.active_fruit} back={this.showFruit}/> */}
                </div>
                : 
                <div>
                <img src={fruits_pic} alt="Fruits" /><br/><br/>
                <p>*Click on any one of the fruit to know more them</p>
                <div className="Tilesgrid">
                {this.props.fruits.allfruits.map(fruit => {
                    // console.log('fruit',fruit)
                    return <div className="Tile" onClick={ ()=>this.showFruit(fruit) } >
                    {/* return <div className="Tile" onClick={()=>this.showFruit(fruit)}> */}
                        <img src={fruit.img} alt={fruit.name} /><br/>
                        <h4>{fruit.name}</h4></div>
                })}
            </div></div>}
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    console.log('state',state)
    return {fruits:state.fruits}
}

const mapDispatchToProps = (dispatch) => {
    console.log('dispatch',dispatch)
    return { all_fruits: (allfruits) => dispatch({type:"ALL_FRUITS",allfruits:allfruits}), show_fruit:(fruit)=>dispatch({type:"SHOW_FRUIT",showFruit:fruit})}
}

export default connect(mapStatetoProps)(Fruits);
// export default connect(mapStatetoProps,mapDispatchToProps)(Fruits);