import * as types from '../constants/ActionTypes';
import AsyncStorage from '@react-native-community/async-storage';

var initialState = [];
const rating = (state = initialState, action) => {
  var index = -1;
  var {product} = action;
  switch (action.type) {
    case types.ADD_FAVORITE:
      index = findRating(state, product);
      if (index !== -1) {
        state.splice(index, 1);
      } else {
        state.push({
          id: product.id,
          kindFoodID: product.kindFoodID,
          imagesFood: product.imagesFood,
          informationFood: product.informationFood,
          nameFood:product.nameFood,
            price:product.price,
        });
      }

      AsyncStorage.setItem('Favorite', JSON.stringify(state));
      return [...state];

      case types.DELETE_FAVORITE:
        index = findRating(state, product);
        if (index !== -1) {
          state.splice(index, 1);
        }
        AsyncStorage.setItem('Favorite', JSON.stringify(state));
        return [...state];
    default:
      return [...state];
  }
};
var findRating = (rating, product) => {
  var index = -1;
  if (rating.length > 0) {
    for (var i = 0; i < rating.length; i++) {
      if (rating[i].id === product.id) {
        index = i;
        break;
      }
    }
  }
  return index;
};
export default rating;
