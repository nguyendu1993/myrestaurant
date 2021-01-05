import * as types from '../constants/ActionTypes';
var initialState = [];
const uservoucher = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USERVOUCHER:
      state = action.uservoucher;
      return [...state];

    case types.UPDATE_STATUSVC:
    
      state = action.uservoucher;
      return [...state];

    default:
      return [...state];
  }
};

export default uservoucher;
