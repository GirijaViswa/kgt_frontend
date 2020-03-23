import React from 'react';
import SingleVegTaste from './SingleVegTaste';
import SingleVegGrow from './SingleVegGrow';
import NutritionFact from '../Fruits/NutritionFacts.js';
import './SingleVeg.css'

class SingleVeg extends React.Component
{
    state = {info:[],veg_taste:false,veg_grow:false,desc:false,veg_nutrition:false}

    componentDidMount()
    {
// to fetch the nutritional facts of this veg    -- part - 1  
        var headers = {method:'GET',redirect:'follow'}
        var url="https://cors-anywhere.herokuapp.com/http://tropicalfruitandveg.com/api/tfvjsonapi.php?tfvitem="+this.props.veg.tfvname
        fetch(url, headers)
        .then(resp => resp.json())
        .then(data => this.setState({info:data.results}))
        .catch(error => console.log('error', error));

// to fetch the nutritional facts of this veg   --part - 2
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var ingr = "1 cup "+this.props.veg.name
        var raw = JSON.stringify({"title":"Fresh","prep":"1.","yield":"About 1 servings","ingr":[ingr]});
        console.log(raw)
        var requestOptions = { method: 'POST', headers: myHeaders, body: raw, redirect: 'follow' };

        fetch("https://api.edamam.com/api/nutrition-details?app_id=0d480d4b&app_key=6428fff964ea8c0ed610bca08120c4fe", requestOptions)
        .then(response => response.json())
        .then(result => this.setState(prevState =>({...prevState,nutritional_facts:result})))
        .catch(error => console.log('error', error));

// to fetch the videos of this veg
        var recipe_videos = [];
        var garden_videos = [];
        fetch(`http://localhost:3000/products/${this.props.veg.name}/videos`)
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
            this.setState(prevState => ({...prevState,veg_recipe:recipe_videos,veg_garden:garden_videos}))
        })
        .catch(error => console.log('error', error));
    }

//to show the description of the veg
    handleDescription = () => (
        this.setState(prevState => ({...prevState,desc:!prevState.desc,veg_grow:false,veg_taste:false,veg_nutrition:false}))
    );

//to show the recipes available for the veg
    handleTaste = () => (
        this.setState(prevState => ({...prevState,veg_taste:!prevState.veg_taste,desc:false,veg_grow:false,veg_nutrition:false}))
    );
    
//to show the gardening videos available for the veg
    handleGrow = () => (
        this.setState(prevState => ({...prevState,veg_grow:!prevState.veg_grow,veg_taste:false,desc:false,veg_nutrition:false}))
    );
//to show the nutritional facts available for the veg
    handleNutrition = () => {
        return this.setState(prevState => ({...prevState,veg_nutrition:!prevState.veg_nutrition,veg_taste:false,desc:false,veg_grow:false}))
    }
  

    render()
    {
        return(
            <div className="Item"> 
                <img src={this.props.veg.img} alt={this.props.veg.name}/>
                <h2>{this.props.veg.name}</h2>
                <nav className="Item__nav">
                    <div className="Item__indiv"><a onClick={this.handleDescription}>Know more about them</a></div>
                    <div className="Item__indiv"><a onClick={this.handleNutrition}>Nutritional facts</a></div>
                    <div className="Item__indiv"><a onClick={this.handleTaste}>How to use them?</a></div>
                    <div className="Item__indiv"><a onClick={this.handleGrow}>How to grow them?</a></div>
                </nav>

                {this.state.veg_nutrition ? <NutritionFact facts={this.state.nutritional_facts}/> : null}

                {this.state.veg_grow || this.state.veg_taste ?
                <div>
                    {this.state.veg_taste ?
                    <SingleVegTaste veg_recipe={this.state.veg_recipe}/>
                    :
                    <SingleVegGrow veg_garden={this.state.veg_garden}/>
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
                 <br/><br/><center><button onClick={this.props.back}>Check out other Vegetables here!</button></center><br/><br/>
                </div> 
        )
    }
}

export default SingleVeg