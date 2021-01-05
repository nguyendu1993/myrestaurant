import * as types from '../constants/ActionTypes';

import firebase from '../../firebase/firebase';
export const addLike= (
  
    product,check_favorite,userID
  ) => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear();
    var getdate = date + '/' + month + '/' + year;
    var date = Date.now();
//    console.log('aggggg' + check_favorite);
  
    return (dispatch) => {
      firebase.database().ref('/Like').push({
        userID: userID,
        foodID: product.id,
        favorite: !check_favorite,
        date: getdate,
   
      });
      console.log('tc');
    };
  };
  
  export const updateLike= (
  
    like, product,check_favorite,userID
  ) => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear();
    var getdate = date + '/' + month + '/' + year;
    var date = Date.now();
    console.log('agggssssssgg' + like[0].id);
  
    return (dispatch) => {
      firebase.database().ref('/Like').child(like[0].id).set({
        userID: userID,
        foodID: product.id,
        favorite: false,
        date: getdate,
   
      });
      console.log('tcddđ');
    };
  };
  
  export const getallLike = (userID) => {
    return (dispatch) => {
      firebase
        .database()
        .ref('/Like')
        .orderByChild('userID')
      .equalTo(userID)
        .on('value', (snapshot) => {
          var items1 = [];
          snapshot.forEach((child) => {
            let item = {
              id: child.key,
              userID: child.val().userID,
              foodID: child.val().foodID,
              favorite: child.val().favorite,
              date: child.val().date,
            
            };
            items1.push(item);
          });
          dispatch(acFetchLike(items1));
        });
    };
  };
  export const acFetchLike = (like) => ({
    type: types.ADD_LIKE,
    like,
  });
  