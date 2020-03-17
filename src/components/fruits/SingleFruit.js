import React from 'react';
import SingleFruitTaste from './SingleFruitTaste';
import SingleFruitGrow from './SingleFruitGrow';
import './SingleFruit.css'

class SingleFruit extends React.Component
{
    state = {info:[],fruit_taste:false,fruit_grow:false,desc:false}

    componentDidMount()
    {
// to fetch the nutritional facts of this fruit    -- part - 1  
        var headers = {method:'GET',redirect:'follow'}
        var url="https://cors-anywhere.herokuapp.com/http://tropicalfruitandveg.com/api/tfvjsonapi.php?tfvitem="+this.props.fruit.tfvname
        fetch(url, headers)
        .then(resp => resp.json())
        .then(data => this.setState({info:data.results}))
        .catch(error => console.log('error', error));

// to fetch the nutritional facts of this fruit   --part - 2
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var ingr = "1 cup "+this.props.fruit.name
        var raw = JSON.stringify({"title":"Fresh","prep":"1.","yield":"About 1 servings","ingr":[ingr]});
        console.log(raw)
        var requestOptions = { method: 'POST', headers: myHeaders, body: raw, redirect: 'follow' };

        fetch("https://api.edamam.com/api/nutrition-details?app_id=0d480d4b&app_key=6428fff964ea8c0ed610bca08120c4fe", requestOptions)
        .then(response => response.json())
        .then(result => this.setState(prevState =>({...prevState,nutritional_facts:result})))
        .catch(error => console.log('error', error));

// to fetch the videos of this fruit
        var recipe_videos = [];
        var garden_videos = [];
        fetch(`http://localhost:3000/products/${this.props.fruit.name}/videos`)
        .then(resp => resp.json())
        .then(data => {
            data.videos.map(video => {
                if (video.video_type === "Recipe")
                {
                    recipe_videos = [...recipe_videos,video]
                }
                else
                {
                    garden_videos = [...garden_videos,video]
                }
            })
            this.setState(prevState => ({...prevState,fruit_recipe:recipe_videos,fruit_garden:garden_videos}))
        })
        .catch(error => console.log('error', error));
    }

//to show the description of the fruit
    handleDescription = () => (
        this.setState(prevState => ({...prevState,desc:!prevState.desc,fruit_grow:false,fruit_taste:false}))
    );

//to show the recipes available for the fruit
    handleTaste = () => (
        this.setState(prevState => ({...prevState,fruit_taste:!prevState.fruit_taste,desc:false,fruit_grow:false}))
    );
    
//to show the gardening videos available for the fruit
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
                    <SingleFruitTaste fruit_recipe={this.state.fruit_recipe}/>
                    :
                    <SingleFruitGrow fruit_garden={this.state.fruit_garden}/>
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
                 <br/><br/><center><button onClick={this.props.back}>Check out other fruits here!</button></center><br/><br/>
                </div> 
        )
    }
}

export default SingleFruit