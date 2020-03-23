import React from 'react';
import './NutritionFacts.css'

class NutritionFact extends React.Component
{
    constructor(props)
    {
        super(props) 
        this.state={facts:''}
    }

    componentDidMount()
    {
        this.setState({facts:this.props.facts})
    }

    render()
    {
        return(
        <div className="NutritionBlock">
            {this.state.facts ? 
            <div>
            <h2>Nutritional Facts</h2>
            <hr/>
            1 cup serving {this.state.facts.calories}g
            <hr/>
            <div className="NutriIndent"><h3>Calories  <div className="Spacer"/> {this.state.facts.calories}</h3></div>
            Amount per serving
            <hr/>
            %Daily Value*<br/>
            <div className="NutriIndent">Total Fat          <div className="Spacer"/>           {this.state.facts.totalNutrientsKCal.FAT_KCAL.quantity}  {this.state.facts.totalNutrientsKCal.FAT_KCAL.unit}<br/></div>
            <div className="NutriIndent">Total Carbohydrate <div className="Spacer"/>           {this.state.facts.totalNutrientsKCal.CHOCDF_KCAL.quantity}  {this.state.facts.totalNutrientsKCal.CHOCDF_KCAL.unit}<br/></div>
            <div className="NutriIndent">Protein            <div className="Spacer"/>           {this.state.facts.totalNutrientsKCal.PROCNT_KCAL.quantity}  {this.state.facts.totalNutrientsKCal.PROCNT_KCAL.unit}<br/></div>
            <div className="NutriIndent">Total Energy       <div className="Spacer"/>           {this.state.facts.totalNutrientsKCal.ENERC_KCAL.quantity}  {this.state.facts.totalNutrientsKCal.ENERC_KCAL.unit}<br/></div>
            <hr/>
            <h6>*The % Daily Value(DV) tells you how much a nutritentin a serving of food contributes to a daily diet.
            2000 calories a day is used for general nutrition advice.</h6>
            <h4>Health Labels</h4><ul>
            {this.state.facts.healthLabels.map(item => {return <li>{item}</li>})}</ul>
            </div>
            : <div>Nutritional values aren't available for this product</div> }
        </div>
        );
    }
}

export default NutritionFact