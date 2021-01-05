import h1 from '../../images/h2.jpg';
import * as types from '../constants/ActionTypes';
 
var initialState =[
    // {
    //     id: 1,
    //     image: h1,
    //     name: 'Salad rau củ',
    //     price: 10.000
    //   },
    //   {
    //     id: 2,
    //     image: h1,
    //     name: 'Salad rau củ',
    //     price: 20.000
    //   },
    //   {
    //     id: 3,
    //     image: h1,
    //     name: 'Salad rau củ',
    //     price: 30.000,
    //   },
    //   {
    //     id: 4,
    //     image: h1,
    //     name: 'Salad rau củ',
    //     price: 40.000
    //   },
    //   {
    //     id: 5,
    //     image: h1,
    //     name: 'Salad rau củ',
    //     price: 50.000
    //   },
    //   {
    //     id: 6,
    //     image: h1,
    //     name: 'Salad rau củ',
    //     price: 60.000
    //   },
    //   {
    //     id: 7,
    //     image: h1,
    //     name: 'Salad rau củ',
    //     price: 70.000
    //   },
    //   {
    //     id: 8,
    //     image: h1,
    //     name: 'Salad rau củ',
    //     price: 80.000
    //   },
];
const products = (state = initialState,action)=>{
    switch (action.type) {
      case types.FETCH_PRODUCTS:
        state = action.products;
        return [...state];
        default: return [...state];
        
    }
}

export default products;