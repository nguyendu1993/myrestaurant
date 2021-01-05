import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  Dimensions,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import {connect} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TextInput} from 'react-native-paper';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import h1 from '../images/h2.jpg';
import {actUpdateProductInCart} from '../redux/actions/index';
import * as Message from '../redux/constants/Message';
import add from '../images/add.png';
import minus from '../images/minus.png';
import Cartitem from '../component/Favoritesection';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import Cartempty from '../component/Cartempty';

import CartResult from '../component/CartResult';
import {actDeleteProductInCart} from '../redux/actions/index';
import firebaseConfig from '../firebase/firebase';
import {actionAddToCart, actDeleteFavorite} from '../redux/actions/index';
const {height, width} = Dimensions.get('window');

class Favorite extends Component {
  constructor(props) {
    super(props);
    this.itemRef = firebaseConfig.database().ref('Food');
  }
  // setdb() {
  //   this.itemRef.push({
  //     id: 2,
  //     image: '',
  //     name: 'Salad rau củ',
  //    amount:50
  //   });
  // }
  // setdb() {
  //   this.itemRef.push({
  //     id: 2,
  //     idCategory: 3,
  //     img:
  //       'https://firebasestorage.googleapis.com/v0/b/duanttn.appspot.com/o/h1.jpg?alt=media&token=7abafdbd-35a9-4e6b-8e03-b42652c8289b',
  //     name: 'Salad rau củ',
  //     description:
  //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque est metus,',
  //     price: 50,
  //   });
  // }

  render() {
    const {navigation} = this.props;
  
    var {rating} = this.props;
    // console.log(rating,'ssssssssssss')
    return (
      <View>
        <View style={{marginBottom: 10}}>
          <ScrollView>
            {/* <CartItem />
            <CartItem /> */}
            {this.ShowCartItem(rating,navigation)}
            {/* // {this.showTotalAmount(rating,navigation)} */}
            {/* // {children} */}
          </ScrollView>
        </View>
      </View>
    );
  }

  ShowCartItem = (rating,navigation) => {
  var {onDeleteFavorite} = this.props;

    var result = <Cartempty />;
    if (rating.length > 0) {
      result = rating.map((item, index) => {
        return (
          <Cartitem
            key={index}
            item={item}
            index={index}
            navigation={navigation}
            onDeleteFavorite={onDeleteFavorite}
          />
        );
      });
    }
    return result;
  };
  showTotalAmount = (rating, navigation) => {
    var result = null;
    if (rating.length > 0) {
      result = <CartResult rating={rating} navigation={navigation} />;
    }
    return result;
  };
}

const mapStateToprops = (state) => {
  return {
    rating: state.rating,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onDeleteFavorite: (product) => {
      dispatch(actDeleteFavorite(product));
    },
  };
};
export default connect(mapStateToprops, mapDispatchToProps)(Favorite);
