var inittialSate = [
    {
        id:1,
        name: 'check',
        status: true
    }
];
import * as types from '../constants/ActionTypes';
var myReducer = (state = inittialSate, action) =>{

    switch(action.type){
        case types.List_all:
        return state;

        default: return state;
    }
    
}
 export default myReducer;