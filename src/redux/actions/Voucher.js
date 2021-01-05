import * as types from '../constants/ActionTypes';

import firebase from '../../firebase/firebase';
import h1 from '../../images/h2.jpg';
import AsyncStorage from '@react-native-community/async-storage';

export const actFetchRequetVoucher = () => {
  return (dispatch) => {
    firebase
      .database()
      .ref('/vouchers')

      .on('value', (snapshot) => {
        var items1 = [];
        snapshot.forEach((child) => {
          let item = {
            voucherId: child.key,
            code: child.val().code,
            dateEnd: child.val().dateEnd,
            dateStart: child.val().dateStart,
            description: child.val().description,
            discount: child.val().discount,
            status: child.val().status,
          };
          items1.push(item);
        });
        dispatch(actFetchVoucher(items1));
      });
  };
};

export const actFetchRequetusreVoucher = (userID) => {
  // console.log(userID);
  return (dispatch) => {
    firebase
      .database()
      .ref('/user_vouchers')
      .orderByChild('userID')
      .equalTo(userID)

      .on('value', (snapshot) => {
        var items1 = [];
        var items2 = [];
        snapshot.forEach((child) => {
          let item = {
            idvc: child.key,
            userID: child.val().userID,
            voucherId: child.val().voucherId,

            status: child.val().status,
          };
          items1.push(item);

         
        });
        var newdat =  items1.filter((item) => item.status !=1);
         // console.log(newdat,"newssss");
        dispatch(actFetchUserVoucher(newdat));
      });
  };
};

export const actFetchUpdateStatus = (voucherIds, userID,voucherId) => {
   console.log(voucherIds, 'ìg');
  return (dispatch) => {
    firebase
      .database()
      .ref('/user_vouchers')
      .child(voucherIds)
      .set({
        voucherId: voucherId,
        userID: userID,
        status: 1,
      });
  };
};
export const actFetUpdateVC = (uservoucher) => ({
  type: types.UPDATE_STATUSVC,
  uservoucher,
});
export const actFetchUserVoucher = (uservoucher) => ({
  type: types.GET_USERVOUCHER,
  uservoucher,
});
export const actFetchVoucher = (voucher) => ({
  type: types.GET_VOUCHER,
  voucher,
});
