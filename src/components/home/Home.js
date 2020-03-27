import React from 'react';
import center_pic from '../images/center_pic.jpg'
import mangoes from '../images/mangoes.jpg';
import papaya from '../images/papaya.jpg';
import plum from '../images/plum.jpg';
import berry from '../images/berry.jpg';
import cucumber from '../images/cucumber.jpg';
import './home.css'

function Home()
{
    return (
    <div>
        <div><img src={center_pic} alt="Know,Grow,Taste"/></div>
        <div className="Trend">Fresh this season - Summer
        <div></div>
        <div className="TrendRow">
            <ul>
                <li className="Trend_item"><img src={mangoes} alt="Mangoes" />Mangoes</li>
                <li className="Trend_item"><img src={plum} alt="Plum" />Plums</li>
                <li className="Trend_item"><img src={papaya} alt="Papaya" />Papaya</li>
                <li className="Trend_item"><img src={cucumber} alt="Cucumber" />Cucumber</li>
                <li className="Trend_item"><img src={berry} alt="Berry" />Berries</li>
            </ul>
            {/* <ul className="TrendsNames">
            <li>Mangoes</li><li>Plums</li><li>Papaya</li><li>Cucumber</li><li>Berries</li>
            </ul> */}
        </div>
        </div>
        <div className="Recipe">Trending Recipes</div>
        <div className="RecipeList"><ul>
        {/* <li><iframe width="460" height="315" src="https://www.youtube.com/embed/RPGBMkN-_Ys" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></li> */}
        <li><iframe  src="https://www.youtube.com/embed/RPGBMkN-_Ys" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></li>
        {/* <li><iframe width="460" height="315" src="https://www.youtube.com/embed/RPGBMkN-_Ys" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></li> */}
        <li><iframe  src="https://www.youtube.com/embed/Fz7iFleQyME" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></li>
        </ul></div><br/><br/>
    </div>
    )
}

export default Home