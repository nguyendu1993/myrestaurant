import * as types from '../constants/ActionTypes';
var initialState =[
   
];
const voucher = (state = initialState,action)=>{
    switch (action.type) {
      case types.GET_VOUCHER:
        state = action.voucher;
        return [...state];

       

        default: return [...state];
        
    }
}

export default voucher;