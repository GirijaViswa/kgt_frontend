import React from 'react';
import SingleFruitTaste from './SingleFruitTaste';
import SingleFruitGrow from './SingleFruitGrow';
import './SingleFruit.css'

class SingleFruit extends React.Component
{
    state = {info:[],fruit_taste:false,fruit_grow:false,desc:false}

    componentDidMount()
    {
        var headers = {method:'GET',redirect:'follow'}
        var url="https://cors-anywhere.herokuapp.com/http://tropicalfruitandveg.com/api/tfvjsonapi.php?tfvitem="+this.props.fruit.tfvname
        console.log(url)
        fetch(url, headers)
        .then(resp => resp.json())
        .then(data => this.setState({info:data.results}))
    }

    handleDescription = () => (
        this.setState(prevState => ({...prevState,desc:!prevState.desc,fruit_grow:false,fruit_taste:false}))
    );

    handleTaste = () => (
        this.setState(prevState => ({...prevState,fruit_taste:!prevState.fruit_taste,desc:false,fruit_grow:false}))
    );

    handleGrow = () => (
        this.setState(prevState => ({...prevState,fruit_grow:!prevState.fruit_grow,fruit_taste:false,desc:false}))
    );

    render()
    {
        return(
            <div className="Item"> 
                <img src={this.props.fruit.img} alt={this.props.fruit.name}/>
                <h2>{this.props.fruit.name}</h2>
                <nav className="Item__nav">
                    <div className="Item__indiv"><a onClick={this.handleDescription}>Know more about them</a></div>
                    <div className="Item__indiv"><a onClick={this.handleTaste}>How to use them?</a></div>
                    <div className="Item__indiv"><a onClick={this.handleGrow}>How to grow them?</a></div>
                </nav>

                {this.state.fruit_grow || this.state.fruit_taste ?
                <div>
                    {this.state.fruit_taste ?
                    <SingleFruitTaste />
                    :
                    <SingleFruitGrow/>
                    }
                </div>
                : null}

                {/*Place them under the know more */}
                <div>
                {this.state.info && this.state.info[0] && this.state.desc ? 
                <div> <table className="Tcontents"><tboby>
                <tr><td style={{color: "#69841F",fontWeight:"italic",fontSize:"30px"}}>Also known as </td></tr>
                <tr><td><p>{this.state.info[0].othname}</p></td></tr><tr></tr>
                <tr><td style={{color: "#69841F",fontWeight:"italic",fontSize:"30px"}}>Botanical Name</td></tr>
                <tr><td><p>{this.state.info[0].botname}</p></td></tr><tr></tr>
                <tr><td style={{color: "#69841F",fontWeight:"italic",fontSize:"30px"}}>Description</td></tr>
                <tr><td><p>{this.state.info[0].description}</p></td></tr><tr></tr>
                <tr><td style={{color: "#69841F",fontWeight:"italic",fontSize:"30px"}}>Climate</td></tr>
                <tr><td><p>{this.state.info[0].climate}</p></td></tr><tr></tr>
                <tr><td style={{color: "#69841F",fontWeight:"italic",fontSize:"30px"}}>Soil</td></tr>
                <tr><td><p>{this.state.info[0].soil}</p></td></tr><tr></tr>
                <tr><td style={{color: "#69841F",fontWeight:"italic",fontSize:"30px"}}>Propagation</td></tr>
                <tr><td><p>{this.state.info[0].propagation}</p></td></tr><tr></tr>
                {this.state.info[0].health ? 
                    <tr><tr><td style={{color: "#69841F",fontWeight:"italic",fontSize:"30px"}}>Health benefits </td></tr>   
                    <tr><td><p>{this.state.info[0].health}</p></td></tr></tr>
                : null }
                </tboby></table></div>
                 : null}</div>
                 {/*Back Button */}
                <center><button onClick={this.props.back}>Back</button></center>
                </div> 
        )
    }
}

export default SingleFruit