import h1 from '../../images/h2.jpg';
import * as types from '../constants/ActionTypes';
 
var initialState =[
   
];
const categorys = (state = initialState,action)=>{
    switch (action.type) {
      case types.FETCH_CATEGORY:
        state = action.categorys;
        return [...state];
        default: return [...state];
        
    }
}

export default categorys;