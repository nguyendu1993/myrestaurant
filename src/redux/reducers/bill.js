import * as types from '../constants/ActionTypes';
var initialState = [
   
];
const bill = (state = initialState,action)=>{
    switch (action.type) {
      case types.ADD_BILL:
        state = action.bill;
        return [...state];
        default: return [...state];
        
    }
}

export default bill;