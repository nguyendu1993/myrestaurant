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
  SafeAreaView,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import CartResult from '../component/CartResult';
import {actDeleteProductInCart} from '../redux/actions/index';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import Cartempty from '../component/Cartempty';

import Cartitem from '../component/CartItem';
const {height, width} = Dimensions.get('window');

class Cart extends Component {
  render() {
    var {cart} = this.props;
    var {navigation,} = this.props;
  

    return (
      <View>
                  <StatusBar backgroundColor="#F58B03" barStyle="light-content" />

        <View style={{marginBottom: 10}}>
          <ScrollView>
            {/* <CartItem />
            <CartItem /> */}
            {this.ShowCartItem(cart)}
           
            {this.showTotalAmount(cart,navigation)}
           {/* // {children} */}
          </ScrollView>
        </View>
        
      </View>
    );
  }
  ShowCartItem = (cart) => {
    var {onDeleteProductInCart} = this.props;

    var result = <Cartempty />;
    if (cart.length > 0) {
      result = cart.map((item, index) => {
        return (
          <Cartitem
            key={index}
            item={item}
            index={index}
            onDeleteProductInCart={onDeleteProductInCart}
          />
        );
      });
    }
    return result;
  };
  showTotalAmount = (cart,navigation) => {
    var result = null;
    if (cart.length > 0) {
      result = <CartResult cart={cart} navigation={navigation}  />;
    }
    return result;
  };
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      product: PropTypes.shape({
        id: PropTypes.string.isRequired,
        imagesFood: PropTypes.string.isRequired,
        nameFood: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      }).isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onDeleteProductInCart: PropTypes.func.isRequired,
};

const mapStateToprops = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onDeleteProductInCart: (product) => {
      dispatch(actDeleteProductInCart(product));
    },
  };
};
export default connect(mapStateToprops, mapDispatchToProps)(Cart);
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: '#F58B03',

    borderBottomWidth: 1,
    borderBottomColor: 'white',
    padding: 5,
  },
  viewtextm: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textstyle: {
    alignItems: 'center',
    textAlign: 'center',
    marginLeft: width * 0.32,
    fontSize: 20,
    color: 'white',
    fontFamily: 'ArchivoNarrow-Bold',
  },
});
