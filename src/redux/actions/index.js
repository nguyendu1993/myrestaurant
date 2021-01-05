import * as types from '../constants/ActionTypes';

import firebase from '../../firebase/firebase';
import h1 from '../../images/h2.jpg';
import AsyncStorage from '@react-native-community/async-storage';
import {Children} from 'react';

export const listall = () => ({
  type: types.List_all,
});
// async getData() {
//   return await AsyncStorage.getItem('UserID');
// }

// }

export const actFetchAllPrductsRequest = () => {
  return (dispatch) => {
    firebase
      .database()
      .ref('/food')
      .on('value', (snapshot) => {
        var items1 = [];
        snapshot.forEach((child) => {
          let item = {
            id: child.key,
            kindFooID: child.val().kindFooID,
            informationFood: child.val().informationFood,
            imagesFood: child.val().imagesFood,
            nameFood: child.val().nameFood,
            status: child.val().status,
            price: child.val().price,
          };
          items1.push(item);
        });
        dispatch(actFetchPrducts(items1));
      });
  };
};
export const actFetchPrductsRequest = (id) => {
  return (dispatch) => {
    // console.log('jjjjjj' + id);
    firebase
      .database()
      .ref('/food')
      .orderByChild('kindFoodID')
      .equalTo(id)
      .on('value', (snapshot) => {
        var items1 = [];
        snapshot.forEach((child) => {
          let item = {
            id: child.key,
            kindFoodID: child.val().kindFoodID,
            informationFood: child.val().informationFood,
            imagesFood: child.val().imagesFood,
            nameFood: child.val().nameFood,
            status: child.val().status,
            price: child.val().price,
          };
          items1.push(item);
        });
        dispatch(actFetchPrducts(items1));
        // console.log('jjjjjj' + items1);
      });
  };
};
export const actFetchPrducts = (products) => ({
  type: types.FETCH_PRODUCTS,
  products,
});

export const actFetchCategorysRequest = () => {
  return (dispatch) => {
    firebase
      .database()
      .ref('/kind_food')
      .on('value', (snapshot) => {
        var category = [];
        snapshot.forEach((child) => {
          let item = {
            id: child.key,
            imagesKindFood: child.val().imagesKindFood,
            nameKindFood: child.val().nameKindFood,
            quantity: child.val().quantity,
            status: 0,
          };
          category.push(item);
        });
        dispatch(actCategorys(category));
      });
  };
};
export const actCategorys = (categorys) => ({
  type: types.FETCH_CATEGORY,
  categorys,
});

export const actaddBillTofirebase = (
  cart,
  address,
  phone,
  totalprice,
  userID,
  discout,titile
) => {
  var dateN = Date.now();



  // console.log('aggggg' + userID);
  var date = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Month
  var year = new Date().getFullYear();
  var getdate = date + '/' + month + '/' + year;
  return (dispatch) => {
    firebase.database().ref('/Bill').push({
      cart: cart,
      address: address,
      phone: phone,
      totalprice: totalprice,
      date: getdate,
      payment: titile,
      status: 0,
      userID: userID,
      billid: dateN,
      discout: discout,
    });
    console.log('tc');

    dispatch(deletec(cart));
  };
};

export const actFetcBillRequest = (userID) => {
  return (dispatch) => {
    firebase
      .database()
      .ref('/Bill')
      .orderByChild('userID')
      .equalTo(userID)
      .on('value', (snapshot) => {
        var items1 = [];
        snapshot.forEach((child) => {
          let item = {
            ids: child.key,
            cart: child.val().cart,
            address: child.val().address,
            phone: child.val().phone,
            totalprice: child.val().totalprice,
            payment: child.val().payment,
            status: child.val().status,
            date: child.val().date,
            discout: child.val().discout,
            billid: child.val().billid,
            userID: userID,
          };
          items1.push(item);
        });

        var newdat = items1.filter((item) => item.status != 4);
        //  console.log(newdat,"newssss");
        dispatch(actionAddBill(newdat));
      });
  };
};

export const actFetcBillRequestStatus = (userID) => {
  return (dispatch) => {
    firebase
      .database()
      .ref('/Bill')
      .orderByChild('userID')
      .equalTo(userID)
      .on('value', (snapshot) => {
        var items1 = [];
        snapshot.forEach((child) => {
          let item = {
            ids: child.key,
            cart: child.val().cart,
            address: child.val().address,
            phone: child.val().phone,
            totalprice: child.val().totalprice,
            payment: child.val().payment,
            status: child.val().status,
            date: child.val().date,
            discout: child.val().discout,
            billid: child.val().billid,
            userID: userID,
          };
          items1.push(item);
        });
        var newdat = items1.filter((item) => item.status == 4);
        //  console.log(newdat,"newssss");
        dispatch(actionAddBill(newdat));
      });
  };
};

export const actFetchUpdateStatusbill = (bills) => {
  return (dispatch) => {
    firebase.database().ref('/Bill').child(bills.ids).set({
      cart: bills.cart,
      address: bills.address,
      phone: bills.phone,
      totalprice: bills.totalprice,
      payment: bills.payment,
      status: 4,
      date: bills.date,
      discout: bills.discout,
      billid: bills.billid,
      userID: bills.userID,
    });
  };
};
export const actFetcBillDetailRequest = (id) => {
  return (dispatch) => {
    firebase
      .database()
      .ref('/Bill')
      .orderByChild('billid')
      .equalTo(id)
      .on('value', (snapshot) => {
        var items1 = [];

        snapshot.forEach((child) => {
          let item = {
            cart: child.val().cart,
            totalprice: child.val().totalprice,
          };
          for (var i in item.cart) {
            item.cart[i].product.quantity = item.cart[i].quantity;
            item.cart[i].product.totalprice = item.totalprice;
            items1.push(item.cart[i].product);
            // console.log(items1, 'devdh');
          }

          dispatch(actioncartdetail(items1));

          // items1.push(item);
        });
      });
  };
};

export const actFetcBillDetailRequestAll = () => {
  return (dispatch) => {
    firebase
      .database()
      .ref('/Bill')
      .on('value', (snapshot) => {
        var items1 = [];

        snapshot.forEach((child) => {
          let item = {
            cart: child.val().cart,
            totalprice: child.val().totalprice,
          };
          for (var i in item.cart) {
            item.cart[i].product.quantity = item.cart[i].quantity;

            items1.push(item.cart[i].product);
            // console.log(items1, 'devdh');
          }

          // items1.push(item);
        });
        var res = items1.reduce((acc, obj) => {
          var existItem = acc.find((item) => item.nameFood === obj.nameFood);
          if (existItem) {
            existItem.quantity += obj.quantity;
            return acc;
          }
          acc.push(obj);
          return acc;
        }, []);
        var items2 = res.sort((a, b) => {
          if (a.quantity < b.quantity) return 1;
          if (a.quantity > b.quantity) return -1;
          return 0;
        })
        .slice(0,5);
        console.log(items2, 'rs');

        dispatch(actioncartdetail(items2));
      });
  };
};

export const actFetAllFood = () => {
  return (dispatch) => {
    firebase
      .database()
      .ref('/Bill')
      .on('value', (snapshot) => {
        var items1 = [];

        snapshot.forEach((child) => {
          let item = {
            cart: child.val().cart,
            totalprice: child.val().totalprice,
          };
          for (var i in item.cart) {
            item.cart[i].product.quantity = item.cart[i].quantity;

            items1.push(item.cart[i].product);
            // console.log(items1, 'devdh');
          }

          // items1.push(item);
        });
        var res = items1.reduce((acc, obj) => {
          var existItem = acc.find((item) => item.nameFood === obj.nameFood);
          if (existItem) {
            existItem.quantity += obj.quantity;
            return acc;
          }
          acc.push(obj);
          return acc;
        }, []);
        var items3 = res.sort((a, b) => {
          if (a.quantity < b.quantity) return 1;
          if (a.quantity > b.quantity) return -1;
          return 0;
        });
       // console.log(items3, 'rs');
//
        dispatch(actioncartdetail(items3));
      });
  };
};
export const actFetUserlRequest = () => {
  return (dispatch) => {
    firebase
      .database()
      .ref('/User')

      .on('value', (snapshot) => {
        var items1 = [];

        snapshot.forEach((child) => {
          let item = {
            address: child.val().address,
            dateCreate: child.val().dateCreate,
            mailUser: child.val().mailUser,
            nameUser: child.val().nameUser,
            phoneUser: child.val().phoneUser,
            status: child.val().status,
            userID: child.val().userID,
          };
          items1.push(item);

          // console.log(item);
          // items1.push(item);
        });
        dispatch(actionGetuser(items1));
      });
  };
};
export const actionGetuser = (user) => {
  return {
    type: types.GET_USER,
    user,
  };
};

// export const actFetRating = () => {
//   return (dispatch) => {
//     firebase
//       .database()
//       .ref('/Rating')
//       .on('value', (snapshot) => {
//         var items1 = [];

//         snapshot.forEach((child) => {
//           let item = {
//             key: child.key,
//             UserID: child.val().UserID,
//             foodID: child.val().foodID,
//             star: child.val().star,
//             favorite: child.val().favorite,
//             date: child.val().date,
//             comments:child.val().comments,
//           };
//           items1.push(item);

//           // items1.push(item);
//         });
//         dispatch(actionGetRating(items1));

//       });
//   };
// };

export const actionGetRating = (rating) => {
  return {
    type: types.ADD_RATING,
    rating,
  };
};

export const deletec = (product) => {
  return {
    type: types.DELETE_CART,
    product,
  };
};
export const actioncartdetail = (cartdetail, total) => {
  return {
    type: types.SHOW_DETAIL,
    cartdetail,
    total,
  };
};
export const actionAddBill = (bill) => {
  return {
    type: types.ADD_BILL,
    bill,
  };
};
export const actionAddToCart = (product, quantity) => {
  return {
    type: types.ADD_TO_CART,
    product,
    quantity,
  };
};

export const actUpdateProductInCart = (product, quantity) => {
  return {
    type: types.UpDATE_PRODUCT_IN_CART,
    product,
    quantity,
  };
};

export const actDeleteProductInCart = (product) => {
  return {
    type: types.DELETE_PRODUCT_IN_CART,
    product,
  };
};
export const actChangeMessage = (message) => {
  return {
    type: types.CHANGE_MESSAGE,
    message,
  };
};

export const actionAddFavorite = (product) => {
  return {
    type: types.ADD_FAVORITE,
    product,
  };
};
export const actDeleteFavorite = (product) => {
  return {
    type: types.DELETE_FAVORITE,
    product,
  };
};

export const actFetComment = (product) => {
  return (dispatch) => {
    firebase
      .database()
      .ref('/Rating')
      .orderByChild('foodID')
      .equalTo(product.id)
      .on('value', (snapshot) => {
        var items1 = [];

        snapshot.forEach((child) => {
          let item = {
            userID: child.val().userID,
            foodID: child.val().foodID,
            star: child.val().star,
            favorite: child.val().favorite,
            date: child.val().date,
            comments: child.val().comments,
            nameUser: child.val().nameUser,
          };
          items1.push(item);

          // items1.push(item);
        });
       // console.log(items1,'ssscssss');
        dispatch(actionAddComment(items1));
      });
  };
};
export const actionAddComment = (comments) => {
  return {
    type: types.ADD_COMMENT,
    comments,
  };
};
export const actaddCommentTofirebase = (
  product,
  check_favorite,
  starCount,
  comment,
  userID,
  nameUser,
) => {
  var date = Date.now();
  console.log('aggggg' + userID);

  return (dispatch) => {
    firebase.database().ref('/Rating').push({
      userID: userID,
      foodID: product.id,
      star: starCount,
      favorite: check_favorite,
      date: date,
      comments: comment,
      nameUser: nameUser,
    });
    console.log('tc');
  };
};
