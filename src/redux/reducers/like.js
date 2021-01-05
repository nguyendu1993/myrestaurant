import * as types from '../constants/ActionTypes';
var initialState =[
   
];
const like = (state = initialState,action)=>{
    switch (action.type) {
      case types.ADD_LIKE:
        state = action.like;
        return [...state];

       

        default: return [...state];
        
    }
}

export default like;