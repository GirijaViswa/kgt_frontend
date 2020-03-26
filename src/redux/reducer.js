const reducer = (oldState,action) => {

    console.log('oldState',oldState)
    console.log('action',action)
   
    switch(action.type)
    {
//User actions
        case "LOGIN":
            return {...oldState,user:{loggedIn:true,token:action.token}}
        
        case "LOGOUT":
            return {...oldState,user:{loggedIn:false,token:null,myprofile:[],myvideos:[]}}

        case "SET_PROFILE":
            return {...oldState,user:{...oldState.user,myprofile:action.myprofile,user_works:action.user_works,user_posts:action.user_posts}}

        case "GET_VIDEOS":
            return {...oldState,user:{...oldState.user,myvideos:action.myvideos}}

        case "ADD_VIDEOS":
            return {...oldState,user:{...oldState.user,myvideos:[...oldState.user.myvideos,action.video]}}
        
        case "REMOVE_VIDEOS":
            var old_videos = oldState.user.myvideos
            var newVideoList = old_videos.filter((video)=> video.id !== action.videoId )
            return {...oldState,user:{...oldState.user,myvideos:newVideoList}}

//Fruits actions
        case "ALL_FRUITS":
            return {...oldState,fruits:{...oldState.fruits,allfruits:action.allfruits}};
        
        case "BACK_TO_ALL_FRUITS":
            return {...oldState,fruits:{...oldState.fruits,show_fruit:false,active_fruit:null,single_fruit:{...oldState.fruits.single_fruit,fruit_taste:false,fruit_grow:false,desc:false,fruit_nutrition:false,recipe_videos:[],garden_videos:[]}}}

        case "SHOW_FRUIT":
            return {...oldState,fruits:{...oldState.fruits,show_fruit:!oldState.fruits.show_fruit,active_fruit:action.showFruit}}

        case "FRUIT_INFO":
            return {...oldState,fruits:{...oldState.fruits,single_fruit:{...oldState.fruits.single_fruit,info:action.info}}}
        
        case "FRUIT_NUTRITION":
            return {...oldState,fruits:{...oldState.fruits,single_fruit:{...oldState.fruits.single_fruit,nutritional_facts:action.nutritional_facts}}}
        
        case "FRUITS_VIDEOS":
            return {...oldState,fruits:{...oldState.fruits,single_fruit:{...oldState.fruits.single_fruit,recipe_videos:action.fruit_recipe,garden_videos:action.fruit_garden}}}
        
        case "SHOW_FRUIT_DESC":
            return {...oldState,fruits:{...oldState.fruits,single_fruit:{...oldState.fruits.single_fruit,fruit_taste:false,fruit_grow:false,desc:!oldState.fruits.single_fruit.desc,fruit_nutrition:false}}}
        
        case "SHOW_FRUIT_TASTE":    
            return {...oldState,fruits:{...oldState.fruits,single_fruit:{...oldState.fruits.single_fruit,fruit_taste:!oldState.fruits.single_fruit.fruit_taste,fruit_grow:false,desc:false,fruit_nutrition:false}}}

        case "SHOW_FRUIT_GROW":
            return {...oldState,fruits:{...oldState.fruits,single_fruit:{...oldState.fruits.single_fruit,fruit_taste:false,fruit_grow:!oldState.fruits.single_fruit.fruit_grow,desc:false,fruit_nutrition:false}}}

        case "SHOW_FRUIT_NUTRITION":
            return {...oldState,fruits:{...oldState.fruits,single_fruit:{...oldState.fruits.single_fruit,fruit_taste:false,fruit_grow:false,desc:false,fruit_nutrition:!oldState.fruits.single_fruit.fruit_nutrition}}}

//Vegetables actions

        case "ALL_VEGS":
            return {...oldState,vegs:{...oldState.vegs,allvegs:action.allvegs}};

        case "BACK_TO_ALL_VEGS":
            return {...oldState,vegs:{...oldState.vegs,show_vegs:false,active_veg:null,single_veg:{...oldState.vegs.single_veg,veg_taste:false,veg_grow:false,desc:false,veg_nutrition:false,recipe_videos:[],garden_videos:[]}}}

        case "SHOW_VEG":
            return {...oldState,vegs:{...oldState.vegs,show_veg:!oldState.vegs.show_veg,active_veg:action.showVeg}}

        case "VEG_INFO":
            return {...oldState,vegs:{...oldState.vegs,single_veg:{...oldState.vegs.single_veg,info:action.info}}}

        case "VEG_NUTRITION":
            return {...oldState,vegs:{...oldState.vegs,single_veg:{...oldState.vegs.single_veg,nutritional_facts:action.nutritional_facts}}}

        case "VEGS_VIDEOS":
            return {...oldState,vegs:{...oldState.vegs,single_veg:{...oldState.vegs.single_veg,recipe_videos:action.veg_recipe,garden_videos:action.veg_garden}}}

        case "SHOW_VEG_DESC":
            return {...oldState,vegs:{...oldState.vegs,single_veg:{...oldState.vegs.single_veg,veg_taste:false,veg_grow:false,desc:!oldState.vegs.single_veg.desc,veg_nutrition:false}}}

        case "SHOW_VEG_TASTE":    
            return {...oldState,vegs:{...oldState.vegs,single_veg:{...oldState.vegs.single_veg,veg_taste:!oldState.vegs.single_veg.veg_taste,veg_grow:false,desc:false,veg_nutrition:false}}}

        case "SHOW_VEG_GROW":
            return {...oldState,vegs:{...oldState.vegs,single_veg:{...oldState.vegs.single_veg,veg_taste:false,veg_grow:!oldState.vegs.single_veg.veg_grow,desc:false,veg_nutrition:false}}}

        case "SHOW_VEG_NUTRITION":
            return {...oldState,vegs:{...oldState.vegs,single_veg:{...oldState.vegs.single_veg,veg_taste:false,veg_grow:false,desc:false,veg_nutrition:!oldState.vegs.single_veg.veg_nutrition}}}

//Default action
        default:
            return oldState;
    }
}

export default reducer;