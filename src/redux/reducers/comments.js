import * as types from '../constants/ActionTypes';
var initialState =[
   
];
const comments = (state = initialState,action)=>{
    switch (action.type) {
      case types.ADD_COMMENT:
        state = action.comments;
        return [...state];

        default: return [...state];
        
    }
}

export default comments;