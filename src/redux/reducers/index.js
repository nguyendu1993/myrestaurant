import { combineReducers } from 'redux';

import tasks from './tasks';
import categorys from './category';
import products from './products';
import firebase from '../../firebase/firebase';
import bill from './bill';
import cartdetail from './cartdetail';
import user from './user';
import rating from './rating';
import comments from './comments';
import voucher from './voucher';
import uservoucher from './uservoucher';
import like from './like';


import cart from './cart';
const myReducer = combineReducers({
 tasks,
 products,
 cart,
 categorys,
 bill,
 cartdetail,
 user,
  rating,
  comments, voucher,uservoucher,
});
export default myReducer; 