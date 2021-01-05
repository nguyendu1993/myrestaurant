import React, {Component} from 'react';
import Cart from '../../screen/Cart';
import Cartitem from '../../component/CartItem';
import {connect} from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,Dimensions,TouchableWithoutFeedback
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Cartempty from '../../component/Cartempty';

import product from '../../redux/reducers/products';
import Monansection from '../../component/Monansection';
import PropTypes from 'prop-types';
import cart from '../../redux/reducers/cart';
import CartResult from '../../component/CartResult';
import {actDeleteProductInCart} from '../actions/index';
const {height, width} = Dimensions.get('window');
class CartContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var {cart} = this.props;
    var {navigation} = this.props;
    return (
      <View>
    <SafeAreaView style={{marginBottom: 5}}>
      <View style={styles.header}>
        <View style={{marginLeft: 10}}>
          <TouchableWithoutFeedback  onPress={() => navigation.navigate('Homesection')}>
            <FontAwesome name="angle-left" size={45} color="white" />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.viewtextm}>
          <Text style={styles.textstyle}>Giỏ hàng</Text>
        </View>
      </View>
    </SafeAreaView>

      <Cart>
        {this.ShowCartItem(cart)}
        {this.showTotalAmount(cart)}
      </Cart>
      </View>
    );
  }
  ShowCartItem = (cart) => {
    var { onDeleteProductInCart } = this.props;

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
  showTotalAmount = (cart) => {
    var result = null;
    if (cart.length > 0) {
      result = <CartResult cart={cart} />;
    }
    return result;
  };
}

CartContainer.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        img: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      }).isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onDeleteProductInCart : PropTypes.func.isRequired,
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
export default connect(mapStateToprops, mapDispatchToProps)(CartContainer);

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
