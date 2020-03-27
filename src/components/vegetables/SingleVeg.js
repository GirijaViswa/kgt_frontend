import React from 'react';
import SingleVegTaste from './SingleVegTaste';
import SingleVegGrow from './SingleVegGrow';
import NutritionFact from './NutritionFacts.js';
import './SingleVeg.css'
import {connect} from 'react-redux';

class SingleVeg extends React.Component
{
    
    componentDidMount()
    {
// to fetch the nutritional facts of this veg    -- part - 1  
        // var veg_name = this.props.veg.active_veg.tfvname
        // var headers = {method:'GET',redirect:'follow'}
        // var url="https://cors-anywhere.herokuapp.com/http://tropicalfruitandveg.com/api/tfvjsonapi.php?tfvitem="+veg_name
        // fetch(url, headers)
        // .then(resp => resp.json())
        // .then(data => this.props.dispatch({type:"VEG_INFO",info:data.results}))
        // .catch(error => console.log('error', error));

// to fetch the nutritional facts of this veg   --part - 2
        // var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");
        // var ingr = "1 cup "+this.props.veg.active_veg.name
        // var raw = JSON.stringify({"title":"Fresh","prep":"1.","yield":"About 1 servings","ingr":[ingr]});
        // console.log(raw)
        // var requestOptions = { method: 'POST', headers: myHeaders, body: raw, redirect: 'follow',mode: 'cors'};

        // fetch("https://api.edamam.com/api/nutrition-details?app_id=a4cd23d2&app_key=5bb8fd71794f47b4da95bab16d9d46f7", requestOptions)
        // // fetch("https://api.edamam.com/api/nutrition-details?app_id=0d480d4b&app_key=6428fff964ea8c0ed610bca08120c4fe", requestOptions)
        // .then(response => response.json())
        // .then(result => this.props.dispatch({type:"VEG_NUTRITION",nutritional_facts:result}))
        // .catch(error => console.log('error', error));

// to fetch the videos of this veg
        var recipe_videos = [];
        var garden_videos = [];
        fetch(`http://localhost:3000/products/${this.props.veg.active_veg.name}/videos`)
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
            this.props.dispatch({type:"VEGS_VIDEOS",veg_recipe:recipe_videos,veg_garden:garden_videos})
        })
        .catch(error => console.log('error', error));
    }

//to show the description of the veg
    handleDescription = () => (
        this.props.dispatch({type:"SHOW_VEG_DESC"})
    );

//to show the recipes available for the veg
    handleTaste = () => (
        this.props.dispatch({type:"SHOW_VEG_TASTE"})
    );
    
//to show the gardening videos available for the veg
    handleGrow = () => (
        this.props.dispatch({type:"SHOW_VEG_GROW"})
    );
//to show the nutritional facts available for the veg
    handleNutrition = () => {
        return this.props.dispatch({type:"SHOW_VEG_NUTRITION"})
    }
  

    render()
    {   
        const veg = this.props.veg.active_veg
        const veg_info = this.props.veg.single_veg.info
        
        return(
            <div className="Item"> 
                <img src={veg.img} alt={veg.name}/>
                <h2>{veg.name}</h2>
                <center><nav className="Item__nav">
                    <div className="Item__indiv"><a onClick={this.handleDescription}>Know more about them</a></div>
                    <div className="Item__indiv"><a onClick={this.handleNutrition}>Nutritional facts</a></div>
                    <div className="Item__indiv"><a onClick={this.handleTaste}>How to use them?</a></div>
                    <div className="Item__indiv"><a onClick={this.handleGrow}>How to grow them?</a></div>
                </nav></center>

                {this.props.veg.single_veg.veg_nutrition ? <NutritionFact /> : null}
                {this.props.veg.single_veg.veg_grow || this.props.veg.single_veg.veg_taste ?
                <div>
                    {this.props.veg.single_veg.veg_taste ?
                    <SingleVegTaste />
                    :
                    <SingleVegGrow />
                }
                </div>
                : null}

                {/*Place them under the know more */}
                <div>
                {this.props.veg.single_veg.info && this.props.veg.single_veg.info[0] && this.props.veg.single_veg.desc ? 

                <div> <table className="Tcontents"><tboby>
                <tr><td style={{color: "#69841F",fontWeight:"italic",fontSize:"30px"}}>Also known as </td></tr>
                <tr><td><p>{veg_info[0].othname}</p></td></tr><tr></tr>
                <tr><td style={{color: "#69841F",fontWeight:"italic",fontSize:"30px"}}>Botanical Name</td></tr>
                <tr><td><p>{veg_info[0].botname}</p></td></tr><tr></tr>
                <tr><td style={{color: "#69841F",fontWeight:"italic",fontSize:"30px"}}>Description</td></tr>
                <tr><td><p>{veg_info[0].description}</p></td></tr><tr></tr>
                <tr><td style={{color: "#69841F",fontWeight:"italic",fontSize:"30px"}}>Climate</td></tr>
                <tr><td><p>{veg_info[0].climate}</p></td></tr><tr></tr>
                <tr><td style={{color: "#69841F",fontWeight:"italic",fontSize:"30px"}}>Soil</td></tr>
                <tr><td><p>{veg_info[0].soil}</p></td></tr><tr></tr>
                <tr><td style={{color: "#69841F",fontWeight:"italic",fontSize:"30px"}}>Propagation</td></tr>
                <tr><td><p>{veg_info[0].propagation}</p></td></tr><tr></tr>
                {veg_info[0].health ? 
                    <tr><tr><td style={{color: "#69841F",fontWeight:"italic",fontSize:"30px"}}>Health benefits </td></tr>   
                    <tr><td><p>{veg_info[0].health}</p></td></tr></tr>
                : null }
                </tboby></table></div>
                 : null}</div>
                 {/*Back Button */}
                 <br/><br/><center><button onClick={()=>{this.props.dispatch({type:"BACK_TO_ALL_VEGS"})}}>Check out other Vegetables here!</button></center><br/><br/>
                </div> 
        )
    }
}

const mapStatetoProps = (state) =>(
    {veg:state.vegs}
);

export default connect(mapStatetoProps)(SingleVeg);