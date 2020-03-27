import React from 'react';
import './NutritionFacts.css';
import {connect} from 'react-redux';

var display = null;
class NutritionFact extends React.Component
{

    componentWillMount()
    {
       if(this.props.facts.error)
       {
           display = false
       }
       else
       {
           display = true
       }
    }

    render()
    {
        return(
        <div className="NutritionBlock">
            {display === true ?

            
            <div>
            {this.props.facts ? 
            <div>
            <h2>Nutritional Facts</h2>
            <hr/>
            1 cup serving {this.props.facts.calories}g
            <hr/>
            <div className="NutriIndent"><h3>Calories  <div className="Spacer"/> {this.props.facts.calories}</h3></div>
            Amount per serving
            <hr/>
            %Daily Value*<br/>
            {!this.props.facts.totalNutrientsKCal ? null
            :<div>
            {this.props.facts.totalNutrientsKCal.FAT_KCAL ? 
            <div className="NutriIndent">Total Fat          <div className="Spacer"/>           {this.props.facts.totalNutrientsKCal.FAT_KCAL.quantity}  {this.props.facts.totalNutrientsKCal.FAT_KCAL.unit}<br/></div>
            :null}
            {this.props.facts.totalNutrientsKCal.CHOCDF_KCAL ? 
            <div className="NutriIndent">Total Carbohydrate <div className="Spacer"/>           {this.props.facts.totalNutrientsKCal.CHOCDF_KCAL.quantity}  {this.props.facts.totalNutrientsKCal.CHOCDF_KCAL.unit}<br/></div>
            :null}
            {this.props.facts.totalNutrientsKCal.PROCNT_KCAL ? 
            <div className="NutriIndent">Protein            <div className="Spacer"/>           {this.props.facts.totalNutrientsKCal.PROCNT_KCAL.quantity}  {this.props.facts.totalNutrientsKCal.PROCNT_KCAL.unit}<br/></div>
            :null}
            {this.props.facts.totalNutrientsKCal.ENERC_KCAL ? 
            <div className="NutriIndent">Total Energy       <div className="Spacer"/>           {this.props.facts.totalNutrientsKCal.ENERC_KCAL.quantity}  {this.props.facts.totalNutrientsKCal.ENERC_KCAL.unit}<br/></div>
            :null}</div>
            }
            <hr/>
            <h6>*The % Daily Value(DV) tells you how much a nutritentin a serving of food contributes to a daily diet.
            2000 calories a day is used for general nutrition advice.</h6>
            {this.props.facts.healthLabels ? 
            <div>
            <h4>Health Labels</h4><ul>
            {this.props.facts.healthLabels.map(item => {return <li>{item}</li>})}</ul></div>
            :null}
            </div>
            : <div>Nutritional values aren't available for this product</div> }
            </div>
            :<div>Nutritional values aren't available for this product</div> }
        </div>
        );
    }
}

const mapStatetoProps = (state) => {
    return{facts:state.vegs.single_veg.nutritional_facts}
}

export default connect(mapStatetoProps)(NutritionFact);