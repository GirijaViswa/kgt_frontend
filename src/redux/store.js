import {createStore} from 'redux';
import reducer from './reducer';

const initialState = {
    user:{loggedIn:false,token:null,myprofile:[],myvideos:[],activity:null},

    fruits:
        {allfruits:[],show_fruit:false,active_fruit:null,
        single_fruit:{info:[],fruit_taste:false,fruit_grow:false,desc:false,fruit_nutrition:false,nutritional_facts:null,recipe_videos:[],garden_videos:[]}},

    vegs:
        {allvegs:[],show_veg:false,active_veg:null,
        single_veg:{info:[],veg_taste:false,veg_grow:false,desc:false,veg_nutrition:false,nutritional_facts:null,recipe_videos:[],garden_videos:[]}}
};

const store = createStore(reducer,initialState);

export default store;

