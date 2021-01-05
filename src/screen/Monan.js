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
  Platform,
} from 'react-native';
import {
  actionAddToCart,
  actFetchPrductsRequest,
  actFetRating,
} from '../redux/actions/index';
import {connect} from 'react-redux';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TextInput} from 'react-native-paper';
import {
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import PropTypes from 'prop-types';

import h1 from '../images/h2.jpg';
import Monansection from '../component/Monansection';
const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 250;

const {height, width} = Dimensions.get('window');

class Monan extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // StatusBar.setHidden(true, );

    var {route} = this.props;
    var {item} = route.params;
    var id = item.id;
    //var {id}= item.id;
    // console.log('qau' + item.nameKindFood);
    this.props.fetchAllProduct(id);
  }
  render() {
    var {products, route, rating} = this.props;
    var {route} = this.props;
    var {item} = route.params;
    const {navigation, onPress} = this.props;
    // console.log(products,"produc");
    return (
      <View style={{flex: 1}}>
        {/* <StatusBar  barStyle="light-content" /> */}

        <View style={styles.viewbgr}>
          <Image
            source={{uri: item.imagesKindFood}}
            style={styles.viewimg}></Image>

          <View style={styles.ovelay}>
            <TouchableWithoutFeedback>
              <Text style={styles.textstyle}>{item.nameKindFood}</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <Text style={styles.texttotal}>{item.quantity} món</Text>

        <ScrollView>{this.showProduct(products, navigation)}</ScrollView>
        {/* {this.props.children} */}
      </View>
    );
  }
  showProduct(products, navigation) {
    var result = null;
    if (products.length > 0) {
      result = products.map((product, index) => {
        return (
          <Monansection key={index} product={product} navigation={navigation} />
        );
      });
    }
    return result;
  }
}

Monan.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      kindFoodID: PropTypes.string.isRequired,
      imagesFood: PropTypes.string.isRequired,
      nameFood: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }),
  ).isRequired,
  // onAddToCart: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => {
  return {
    products: state.products,
    rating: state.rating,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllProduct: (id) => {
      dispatch(actFetchPrductsRequest(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Monan);

const styles = StyleSheet.create({
  viewbgr: {
    flexDirection: 'row',
  },
  viewimg: {
    width: width,

    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,
    height: MAX_HEIGHT,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  ovelay: {
    width: width,
    height: MAX_HEIGHT,

    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  textstyle: {
    fontSize: 35,
    color: 'white',
    fontFamily: 'ArchivoNarrow-Bold',
  },
  texttotal: {
    fontSize: 17,
    marginLeft: 20,
    marginTop: 10,
    fontFamily: 'ArchivoNarrow-SemiBold',
  },
  //
});
