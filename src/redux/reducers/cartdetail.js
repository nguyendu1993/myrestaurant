import * as types from '../constants/ActionTypes';
var initialState =[
   
];
const cartdetail = (state = initialState,action)=>{
    switch (action.type) {
      case types.SHOW_DETAIL:
        state = action.cartdetail;
        return [...state];

       

        default: return [...state];
        
    }
}

export default cartdetail;