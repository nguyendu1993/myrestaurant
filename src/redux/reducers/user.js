import * as types from '../constants/ActionTypes';
var initialState =[
];
const user = (state = initialState,action)=>{
    switch (action.type) {
      case types.GET_USER:
        state = action.user;
        return [...state];
        default: return [...state];   
    }
}

export default user;