import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  Dimensions,
  StatusBar,
  StyleSheet,
  ImageBackground,
} from 'react-native';

import {connect} from 'react-redux';

import {
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import h1 from '../../images/h2.jpg';
import Monan from '../../screen/Monan';
//import product from '../reducers/products';
import Monansection from '../../component/Monansection';
import PropTypes from 'prop-types';
const {height, width} = Dimensions.get('window');
import {actionAddToCart, actFetchPrductsRequest} from '../actions/index';
class ProductContainer extends Component {
  constructor(props) {
    super(props);
    // this.state = {id:''};

  }
 
  render() {
    var {products, route} = this.props;
 
    const {onPress} = this.props;

    return <Monan onPress={onPress}>{this.showProduct(products)}</Monan>;
  }
  componentDidMount() {
    var { route} = this.props;
    var {item} = route.params;
    var id= item.id;
    //var {id}= item.id;
    console.log("qau"+id);
    this.props.fetchAllProduct(id);
  }
  showProduct(products) {
    var result = null;
    if (products.length > 0) {
      result = products.map((product, index) => {
        return (
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Motamonan', {product: product})
            }
            key={index}>
            <Monansection key={index} product={product} />
          </TouchableOpacity>
        );
      });
    }
    return result;
  }
}
ProductContainer.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      idCategory: PropTypes.number.isRequired,
      img: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }),
  ).isRequired,
 // onAddToCart: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};
const mapDispatchToProps = (dispatch,props) => {

  return {
    // onAddToCart: (product) => {
    //   dispatch(actAddToCart(product, 1));
    // },

    fetchAllProduct: (id) => {
      dispatch(actFetchPrductsRequest(id));
     // console.log("id:" + id);

    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer);
